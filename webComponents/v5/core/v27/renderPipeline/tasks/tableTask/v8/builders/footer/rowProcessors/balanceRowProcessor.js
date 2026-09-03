import { applyBindings } from "../../../../../common/index.js";
import { aggFuncs } from "../aggFuncs.js";
import { findConfigForColumn } from "../helpers/columnMatcher.js";

/**
 * Balance Row Processor: Evaluates formulas and balance expressions
 * Follows in -> local parameter naming convention
 */
const lookupSummaryValue = ({ inSummaryData, inColumns, inRefKey }) => {
    if (!inSummaryData) return 0;
    if (inRefKey in inSummaryData) return inSummaryData[inRefKey];

    const lowerRef = inRefKey.toLowerCase().trim();
    if (Array.isArray(inColumns)) {
        for (const col of inColumns) {
            const colKey = (col.key || "").toLowerCase();
            const colLabel = (col.label || "").toLowerCase();
            if (colKey === lowerRef || colLabel === lowerRef || colKey.endsWith("." + lowerRef)) {
                if (col.key in inSummaryData) return inSummaryData[col.key];
            }
        }
    }

    for (const [key, val] of Object.entries(inSummaryData)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === lowerRef || lowerKey.endsWith("." + lowerRef)) {
            return val;
        }
    }

    return 0;
};

const evaluateSummaryExpression = ({ inExpression, inSummaryData, inColumns }) => {
    const localExpression = inExpression;
    const localSummaryData = inSummaryData;
    const localColumns = inColumns;

    if (typeof localExpression !== "string") return String(localExpression ?? "");

    const resolvedExpr = localExpression.replace(/\{([^}]+)\}/g, (_, refKey) => {
        const rawVal = lookupSummaryValue({
            inSummaryData: localSummaryData,
            inColumns: localColumns,
            inRefKey: refKey
        });
        const numVal = (typeof rawVal === "number") ? rawVal : parseFloat(String(rawVal).replace(/,/g, "")) || 0;
        return numVal;
    });

    try {
        const sanitized = resolvedExpr.replace(/[^0-9+\-*/().%\s]/g, "");
        if (!sanitized.trim()) return "";
        const evaluated = Function('"use strict"; return (' + sanitized + ')')();
        return typeof evaluated === "number" && !isNaN(evaluated)
            ? evaluated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : String(evaluated);
    } catch (e) {
        return resolvedExpr;
    }
};

/**
 * Balance Row Processor: Evaluates formulas and balance expressions
 * Follows in -> local parameter naming convention
 */
const processBalanceRow = ({ inRowConfig, inColumns, inData, inTemplates, inSummaryData }) => {
    const localRowConfig = inRowConfig;
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localSummaryData = inSummaryData;

    if (!localRowConfig || typeof localRowConfig !== "object" || !Array.isArray(localColumns)) {
        return [];
    }

    const footerRowComposite = localTemplates?.composite?.tableFooterRow || localTemplates?.composite?.tableRow;
    const footerCellComposite = localTemplates?.composite?.tableFooterCell || localTemplates?.composite?.tableDataCell;

    const rowTemplate = footerRowComposite?.template;
    const cellTemplate = footerCellComposite?.template;
    const cellBindings = footerCellComposite?.bindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    const rowNode = JSON.parse(JSON.stringify(rowTemplate));
    rowNode.attributes = rowNode.attributes || {};
    rowNode.attributes.class = "bg-gray-50 font-semibold border-t border-gray-200 text-gray-800";

    const tdCells = localColumns.map((column, colIndex) => {
        const columnConfig = findConfigForColumn({
            inRowConfig: localRowConfig,
            inColumn: column
        });

        let cellContent = "";

        if (columnConfig !== null && columnConfig !== undefined) {
            // 1. If contains {} formula referencing summaryRow
            if (typeof columnConfig === "string" && columnConfig.includes("{") && columnConfig.includes("}")) {
                cellContent = evaluateSummaryExpression({
                    inExpression: columnConfig,
                    inSummaryData: localSummaryData,
                    inColumns: localColumns
                });
            } else {
                // 2. If agg func found, same like summaryrow
                const lowerConfig = typeof columnConfig === "string" ? columnConfig.toLowerCase() : "";
                if (lowerConfig in aggFuncs) {
                    const aggResult = aggFuncs[lowerConfig]({
                        inData: localData,
                        inKey: column.key,
                        inType: column.type
                    });
                    if (lowerConfig === "count") {
                        cellContent = String(aggResult);
                    } else if (lowerConfig === "sum" || lowerConfig === "avg" || lowerConfig === "average") {
                        cellContent = typeof aggResult === "number"
                            ? aggResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : String(aggResult);
                    } else {
                        cellContent = (aggResult !== null && aggResult !== undefined) ? String(aggResult) : "";
                    }
                } else if (typeof columnConfig === "string" && columnConfig.includes("-") && !columnConfig.includes(" ")) {
                    // Fallback to old "Credit-Debit"
                    const parts = columnConfig.split("-").map(p => p.trim());
                    if (parts.length === 2) {
                        const valA = aggFuncs.sum({ inData: localData, inKey: parts[0] });
                        const valB = aggFuncs.sum({ inData: localData, inKey: parts[1] });
                        cellContent = (valA - valB).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    } else {
                        cellContent = String(columnConfig);
                    }
                } else {
                    // 3. Else show that value only
                    cellContent = String(columnConfig);
                }
            }
        }

        return applyBindings({
            inTemplate: cellTemplate,
            inBindings: cellBindings,
            inData: {
                key: column.key,
                value: cellContent
            }
        });
    });

    rowNode.children = tdCells;
    return [rowNode];
};

export {
    processBalanceRow
};

export default processBalanceRow;
