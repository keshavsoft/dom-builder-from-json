import { applyBindings } from "../../../../../common/index.js";
import { aggFuncs } from "../aggFuncs.js";
import { findConfigForColumn } from "../helpers/columnMatcher.js";

/**
 * Balance Row Processor: Evaluates formulas and balance expressions
 * Follows in -> local parameter naming convention
 */
const processBalanceRow = ({ inRowConfig, inColumns, inData, inTemplates }) => {
    const localRowConfig = inRowConfig;
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;

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

    // Evaluate expressions like "Credit-Debit"
    const evaluateExpression = ({ inExpr, inData }) => {
        const localExpr = inExpr;
        const localDataObj = inData;

        if (typeof localExpr !== "string") {
            return String(localExpr ?? "");
        }

        if (localExpr.includes("-")) {
            const parts = localExpr.split("-").map(p => p.trim());
            if (parts.length === 2) {
                const valA = aggFuncs.sum({ inData: localDataObj, inKey: parts[0] });
                const valB = aggFuncs.sum({ inData: localDataObj, inKey: parts[1] });
                return Number((valA - valB).toFixed(2));
            }
        }

        return localExpr;
    };

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
            if (typeof columnConfig === "string" && columnConfig.includes("-")) {
                cellContent = String(evaluateExpression({ inExpr: columnConfig, inData: localData }));
            } else {
                cellContent = String(columnConfig);
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
