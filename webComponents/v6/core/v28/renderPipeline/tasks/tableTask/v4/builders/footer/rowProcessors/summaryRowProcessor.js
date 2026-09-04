import { applyBindings } from "../../../../../common/index.js";
import { aggFuncs } from "../aggFuncs.js";
import { findConfigForColumn } from "../helpers/columnMatcher.js";

/**
 * Summary Row Processor: Computes aggregations (count, sum, avg, min, max)
 * Follows in -> local parameter naming convention
 */
const processSummaryRow = ({ inRowConfig, inColumns, inData, inTemplates }) => {
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

    const rowNode = JSON.parse(JSON.stringify(rowTemplate));
    rowNode.attributes = rowNode.attributes || {};
    rowNode.attributes.class = "bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900";

    const tdCells = localColumns.map((column, colIndex) => {
        const columnConfig = findConfigForColumn({
            inRowConfig: localRowConfig,
            inColumn: column
        });

        let cellContent = "";

        if (columnConfig !== null && columnConfig !== undefined) {
            const lowerConfig = typeof columnConfig === "string" ? columnConfig.toLowerCase() : "";

            if (lowerConfig in aggFuncs) {
                const aggResult = aggFuncs[lowerConfig]({
                    inData: localData,
                    inKey: column.key
                });

                if (lowerConfig === "count") {
                    cellContent = String(aggResult);
                } else if (lowerConfig === "sum" || lowerConfig === "avg" || lowerConfig === "average") {
                    cellContent = typeof aggResult === "number"
                        ? aggResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : String(aggResult);
                } else {
                    cellContent = String(aggResult);
                }
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
    processSummaryRow
};

export default processSummaryRow;
