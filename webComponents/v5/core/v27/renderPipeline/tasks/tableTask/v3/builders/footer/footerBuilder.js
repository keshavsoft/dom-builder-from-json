import { applyBindings } from "../../../../common/index.js";
import { aggFuncs } from "./aggFuncs.js";

/**
 * Builds table footer rows supporting all 3 types:
 * 1. summaryRow: column aggregations (count, sum, avg, min, max)
 * 2. balanceRow: calculated expressions (Credit-Debit) or constants
 * 3. inputsRow: editable input fields inside footer cells
 *
 * Follows in -> local parameter naming convention
 */
const buildFooterRows = ({ inColumns, inData, inTemplates, inFooterConfig }) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localFooterConfig = inFooterConfig;

    if (!Array.isArray(localColumns) || !localFooterConfig || typeof localFooterConfig !== "object") {
        return [];
    }

    // Resolve templates & bindings from localTemplates dictionary
    const footerRowComposite = localTemplates?.composite?.tableFooterRow || localTemplates?.composite?.tableRow;
    const footerCellComposite = localTemplates?.composite?.tableFooterCell || localTemplates?.composite?.tableDataCell;
    const footerInputCellComposite = localTemplates?.composite?.tableFooterInputCell;

    const rowTemplate = footerRowComposite?.template;
    const cellTemplate = footerCellComposite?.template;
    const cellBindings = footerCellComposite?.bindings;

    const inputCellTemplate = footerInputCellComposite?.template || cellTemplate;
    const inputCellBindings = footerInputCellComposite?.bindings || cellBindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    const footerRows = [];

    // Robust column matching helper
    const matchesColumn = ({ inConfigKey, inColumn }) => {
        const localConfigKey = String(inConfigKey || "").toLowerCase().trim();
        const colKey = String(inColumn?.key || "").toLowerCase().trim();
        const colSuffix = colKey.split(".").pop();
        const colLabel = String(inColumn?.label || "").toLowerCase().trim();

        return (
            localConfigKey === colKey ||
            localConfigKey === colSuffix ||
            localConfigKey === colLabel
        );
    };

    // Find configured value from a row config map
    const findConfigForColumn = ({ inRowConfig, inColumn }) => {
        const localRowConfig = inRowConfig;
        const localColumn = inColumn;

        if (!localRowConfig || !localColumn) {
            return null;
        }

        for (const [cfgKey, cfgValue] of Object.entries(localRowConfig)) {
            if (matchesColumn({ inConfigKey: cfgKey, inColumn: localColumn })) {
                return cfgValue;
            }
        }

        return null;
    };

    // Helper: Check if a column is configured in an inputsRow definition
    const checkIsInputColumn = ({ inInputsConfig, inColumn }) => {
        const localInputsConfig = inInputsConfig;
        const localColumn = inColumn;

        if (!localInputsConfig || !localColumn) {
            return false;
        }

        if (Array.isArray(localInputsConfig)) {
            return localInputsConfig.some(item => {
                if (typeof item === "string") {
                    return matchesColumn({ inConfigKey: item, inColumn: localColumn });
                }
                return false;
            });
        }

        if (typeof localInputsConfig === "object") {
            return Object.keys(localInputsConfig).some(key => {
                return matchesColumn({ inConfigKey: key, inColumn: localColumn });
            });
        }

        return false;
    };

    // Helper: Evaluate arithmetic difference expressions like "Credit-Debit"
    const evaluateExpression = ({ inExpr, inData }) => {
        const localExpr = inExpr;
        const localData = inData;

        if (typeof localExpr !== "string") {
            return String(localExpr ?? "");
        }

        if (localExpr.includes("-")) {
            const parts = localExpr.split("-").map(p => p.trim());
            if (parts.length === 2) {
                const valA = aggFuncs.sum({ inData: localData, inKey: parts[0] });
                const valB = aggFuncs.sum({ inData: localData, inKey: parts[1] });
                return Number((valA - valB).toFixed(2));
            }
        }

        return localExpr;
    };

    // Process all entries in localFooterConfig
    for (const [rowKey, rowConfig] of Object.entries(localFooterConfig)) {
        if (!rowConfig) {
            continue;
        }

        const lowerKey = rowKey.toLowerCase();
        const isSummary = lowerKey.includes("summary");
        const isBalance = lowerKey.includes("balance");
        const isInputs = lowerKey.includes("input");

        // 1. INPUTS ROW TYPE (supports array of arrays, array of column keys, or object)
        if (isInputs) {
            const inputsRowDefs = Array.isArray(rowConfig) && rowConfig.length > 0 && Array.isArray(rowConfig[0])
                ? rowConfig
                : [rowConfig];

            for (const singleInputDef of inputsRowDefs) {
                const rowNode = JSON.parse(JSON.stringify(rowTemplate));
                rowNode.attributes = rowNode.attributes || {};
                rowNode.attributes.class = "bg-white border-t border-gray-200 text-gray-800";

                const tdCells = localColumns.map(column => {
                    const isInputCell = checkIsInputColumn({
                        inInputsConfig: singleInputDef,
                        inColumn: column
                    });

                    if (isInputCell) {
                        const initialValue = typeof singleInputDef === "object" && !Array.isArray(singleInputDef)
                            ? (findConfigForColumn({ inRowConfig: singleInputDef, inColumn: column }) || "")
                            : "";

                        return applyBindings({
                            inTemplate: inputCellTemplate,
                            inBindings: inputCellBindings,
                            inData: {
                                key: column.key,
                                placeholder: column.label || column.key,
                                value: String(initialValue)
                            }
                        });
                    }

                    return applyBindings({
                        inTemplate: cellTemplate,
                        inBindings: cellBindings,
                        inData: {
                            key: column.key,
                            value: ""
                        }
                    });
                });

                rowNode.children = tdCells;
                footerRows.push(rowNode);
            }
            continue;
        }

        // 2 & 3. SUMMARY ROW & BALANCE ROW TYPES
        const rowNode = JSON.parse(JSON.stringify(rowTemplate));
        rowNode.attributes = rowNode.attributes || {};

        if (isSummary) {
            rowNode.attributes.class = "bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900";
        } else if (isBalance) {
            rowNode.attributes.class = "bg-gray-50 font-semibold border-t border-gray-200 text-gray-800";
        } else {
            rowNode.attributes.class = "bg-white border-t border-gray-200 text-gray-700";
        }

        const tdCells = localColumns.map((column, colIndex) => {
            const columnConfig = findConfigForColumn({
                inRowConfig: rowConfig,
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
                } else if (typeof columnConfig === "string" && columnConfig.includes("-")) {
                    cellContent = String(evaluateExpression({ inExpr: columnConfig, inData: localData }));
                } else {
                    cellContent = String(columnConfig);
                }
            } else if (colIndex === 0) {
                cellContent = isSummary ? "Total" : isBalance ? "Balance" : "";
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
        footerRows.push(rowNode);
    }

    return footerRows;
};

export {
    buildFooterRows
};

export default buildFooterRows;
