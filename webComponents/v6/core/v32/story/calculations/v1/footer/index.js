import { aggFuncs } from "./helpers/aggFuncs.js";
import { findConfigForColumn } from "./helpers/columnMatcher.js";

/**
 * Stage: Calculates pure footer row objects (summaryRow, balanceRow, inputsRow)
 * Evaluates all math, counts, min/max text/numbers, and balance expressions.
 * Follows in -> local parameter naming convention
 */

export const calculateSummaryRow = ({ inRowConfig, inColumns, inData }) => {
    const localRowConfig = inRowConfig;
    const localColumns = inColumns;
    const localData = inData;

    const rowData = {};

    localColumns.forEach(column => {
        const columnConfig = findConfigForColumn({
            inRowConfig: localRowConfig,
            inColumn: column
        });

        if (columnConfig === null || columnConfig === undefined) {
            rowData[column.key] = "";
            return;
        }

        const lowerConfig = typeof columnConfig === "string" ? columnConfig.toLowerCase() : "";

        if (lowerConfig in aggFuncs) {
            const aggResult = aggFuncs[lowerConfig]({
                inData: localData,
                inKey: column.key,
                inType: column.type
            });

            const isNumberType = column.type === "number";

            if (lowerConfig === "count") {
                rowData[column.key] = isNumberType ? Number(aggResult) : String(aggResult);
            } else if (lowerConfig === "sum" || lowerConfig === "avg" || lowerConfig === "average") {
                if (typeof aggResult === "number") {
                    rowData[column.key] = isNumberType ? aggResult : String(aggResult);
                } else {
                    rowData[column.key] = isNumberType ? Number(aggResult) || 0 : String(aggResult);
                }
            } else {
                if (isNumberType) {
                    const num = Number(aggResult);
                    rowData[column.key] = isNaN(num) ? aggResult : num;
                } else {
                    rowData[column.key] = (aggResult !== null && aggResult !== undefined) ? String(aggResult) : "";
                }
            }
        } else {
            if (column.type === "number") {
                const num = Number(columnConfig);
                rowData[column.key] = isNaN(num) ? columnConfig : num;
            } else {
                rowData[column.key] = String(columnConfig);
            }
        }
    });

    return rowData;
};

export const lookupSummaryValue = ({ inSummaryData, inColumns, inRefKey }) => {
    const localSummaryData = inSummaryData;
    const localColumns = inColumns;
    const localRefKey = inRefKey;

    if (!localSummaryData) return 0;

    // 1. Direct match
    if (localRefKey in localSummaryData) {
        return localSummaryData[localRefKey];
    }

    const lowerRef = localRefKey.toLowerCase().trim();

    // 2. Check against column keys or labels
    if (Array.isArray(localColumns)) {
        for (const col of localColumns) {
            const colKey = (col.key || "").toLowerCase();
            const colLabel = (col.label || "").toLowerCase();
            if (colKey === lowerRef || colLabel === lowerRef || colKey.endsWith("." + lowerRef)) {
                if (col.key in localSummaryData) {
                    return localSummaryData[col.key];
                }
            }
        }
    }

    // 3. Fallback suffix / case-insensitive check
    for (const [key, val] of Object.entries(localSummaryData)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === lowerRef || lowerKey.endsWith("." + lowerRef)) {
            return val;
        }
    }

    return 0;
};

export const evaluateSummaryExpression = ({ inExpression, inSummaryData, inColumns }) => {
    const localExpression = inExpression;
    const localSummaryData = inSummaryData;
    const localColumns = inColumns;

    if (typeof localExpression !== "string") {
        return localExpression;
    }

    // Substitute {columnKey} with resolved summary value
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
        if (!sanitized.trim()) {
            return 0;
        }
        const evaluated = Function('"use strict"; return (' + sanitized + ')')();
        return typeof evaluated === "number" && !isNaN(evaluated) ? Number(evaluated.toFixed(2)) : evaluated;
    } catch (e) {
        return resolvedExpr;
    }
};

export const calculateBalanceRow = ({ inRowConfig, inColumns, inData, inSummaryData }) => {
    const localRowConfig = inRowConfig;
    const localColumns = inColumns;
    const localData = inData;
    const localSummaryData = inSummaryData;

    const rowData = {};

    localColumns.forEach(column => {
        const columnConfig = findConfigForColumn({
            inRowConfig: localRowConfig,
            inColumn: column
        });

        if (columnConfig === null || columnConfig === undefined) {
            rowData[column.key] = "";
            return;
        }

        const isNumberType = column.type === "number";

        // 1. If formula with placeholder {} referencing summaryRow
        if (typeof columnConfig === "string" && columnConfig.includes("{") && columnConfig.includes("}")) {
            const evaluated = evaluateSummaryExpression({
                inExpression: columnConfig,
                inSummaryData: localSummaryData,
                inColumns: localColumns
            });
            rowData[column.key] = isNumberType && typeof evaluated === "number" ? evaluated : evaluated;
            return;
        }

        // 2. If agg func found, compute same like summaryRow
        const lowerConfig = typeof columnConfig === "string" ? columnConfig.toLowerCase() : "";
        if (lowerConfig in aggFuncs) {
            const aggResult = aggFuncs[lowerConfig]({
                inData: localData,
                inKey: column.key,
                inType: column.type
            });

            if (lowerConfig === "count") {
                rowData[column.key] = isNumberType ? Number(aggResult) : String(aggResult);
            } else if (lowerConfig === "sum" || lowerConfig === "avg" || lowerConfig === "average") {
                if (typeof aggResult === "number") {
                    rowData[column.key] = isNumberType ? aggResult : String(aggResult);
                } else {
                    rowData[column.key] = isNumberType ? Number(aggResult) || 0 : String(aggResult);
                }
            } else {
                if (isNumberType) {
                    const num = Number(aggResult);
                    rowData[column.key] = isNaN(num) ? aggResult : num;
                } else {
                    rowData[column.key] = (aggResult !== null && aggResult !== undefined) ? String(aggResult) : "";
                }
            }
            return;
        }

        // 3. Fallback to old "Credit-Debit" syntax if present
        if (typeof columnConfig === "string" && columnConfig.includes("-") && !columnConfig.includes(" ")) {
            const parts = columnConfig.split("-").map(p => p.trim());
            if (parts.length === 2) {
                const [leftColName, rightColName] = parts;
                const leftVal = lookupSummaryValue({
                    inSummaryData: localSummaryData,
                    inColumns: localColumns,
                    inRefKey: leftColName
                });
                const rightVal = lookupSummaryValue({
                    inSummaryData: localSummaryData,
                    inColumns: localColumns,
                    inRefKey: rightColName
                });
                const numA = typeof leftVal === "number" ? leftVal : parseFloat(String(leftVal).replace(/,/g, "")) || 0;
                const numB = typeof rightVal === "number" ? rightVal : parseFloat(String(rightVal).replace(/,/g, "")) || 0;
                const balance = Number((numA - numB).toFixed(2));
                rowData[column.key] = isNumberType ? balance : String(balance);
                return;
            }
        }

        // 4. Else show that value only
        if (isNumberType && typeof columnConfig === "number") {
            rowData[column.key] = columnConfig;
        } else if (isNumberType && !isNaN(Number(columnConfig))) {
            rowData[column.key] = Number(columnConfig);
        } else {
            rowData[column.key] = columnConfig;
        }
    });

    return rowData;
};

export const buildFooterCalculation = ({ inFooterConfig, inColumns, inData }) => {
    const localFooterConfig = inFooterConfig;
    const localColumns = inColumns;
    const localData = inData;

    if (!localFooterConfig || typeof localFooterConfig !== "object" || !Array.isArray(localColumns)) {
        return [];
    }

    const footRows = [];
    let summaryData = null;

    // Calculate summaryRow first so balanceRow can reference it
    if (localFooterConfig.summaryRow) {
        summaryData = calculateSummaryRow({
            inRowConfig: localFooterConfig.summaryRow,
            inColumns: localColumns,
            inData: localData
        });
    }

    // Exact key matching ensures suffixed keys like balanceRow1, inputsRow1 are ignored
    for (const [rowKey, rowConfig] of Object.entries(localFooterConfig)) {
        if (!rowConfig) continue;

        if (rowKey === "summaryRow") {
            footRows.push({
                rowType: "summaryRow",
                data: summaryData
            });
        } else if (rowKey === "balanceRow") {
            footRows.push({
                rowType: "balanceRow",
                data: calculateBalanceRow({
                    inRowConfig: rowConfig,
                    inColumns: localColumns,
                    inData: localData,
                    inSummaryData: summaryData
                })
            });
        } else if (rowKey === "inputsRow") {
            footRows.push({
                rowType: "inputsRow",
                config: rowConfig
            });
        }
    }

    return footRows;
};

export default buildFooterCalculation;
