import { aggFuncs, extractNumber } from "./aggFuncs.js";

/**
 * Builds table footer rows (tfoot tr/td elements) based on footer configuration and aggregation functions
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

    const footerRows = [];

    // Helper to find configured value for a column in a row config
    const findConfigForColumn = ({ inRowConfig, inColumn }) => {
        const localRowConfig = inRowConfig;
        const localColumn = inColumn;

        if (!localRowConfig || !localColumn) {
            return null;
        }

        // Direct key match: e.g. "vchtype" or "allinventoryentries.batchallocations.amount"
        if (localRowConfig[localColumn.key] !== undefined) {
            return localRowConfig[localColumn.key];
        }

        // Last part of dot-path: e.g. "amount"
        const keySuffix = localColumn.key?.split(".").pop();
        if (keySuffix && localRowConfig[keySuffix] !== undefined) {
            return localRowConfig[keySuffix];
        }

        // Label match: e.g. "voucher number"
        if (localColumn.label && localRowConfig[localColumn.label] !== undefined) {
            return localRowConfig[localColumn.label];
        }

        return null;
    };

    // Helper to evaluate simple arithmetic expressions like "Credit-Debit"
    const evaluateExpression = ({ inExpr, inData }) => {
        const localExpr = inExpr;
        const localData = inData;

        if (typeof localExpr !== "string") {
            return String(localExpr ?? "");
        }

        // Check for difference like "A-B"
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

    // Iterate through all row definitions in localFooterConfig
    for (const [rowKey, rowConfig] of Object.entries(localFooterConfig)) {
        if (!rowConfig || typeof rowConfig !== "object") {
            continue;
        }

        const isSummary = rowKey.toLowerCase().includes("summary");
        const isBalance = rowKey.toLowerCase().includes("balance");

        const trAttributes = {
            class: isSummary
                ? "bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900"
                : isBalance
                    ? "bg-gray-50 font-semibold border-t border-gray-200 text-gray-800"
                    : "bg-white border-t border-gray-200 text-gray-700"
        };

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
                        cellContent = typeof aggResult === "number" ? aggResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : String(aggResult);
                    } else {
                        cellContent = String(aggResult);
                    }
                } else if (typeof columnConfig === "string" && columnConfig.includes("-")) {
                    cellContent = String(evaluateExpression({ inExpr: columnConfig, inData: localData }));
                } else {
                    cellContent = String(columnConfig);
                }
            } else if (colIndex === 0 && isSummary) {
                cellContent = "Total";
            }

            return {
                tagName: "td",
                attributes: {
                    class: "px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-900"
                },
                textContent: cellContent
            };
        });

        footerRows.push({
            tagName: "tr",
            attributes: trAttributes,
            children: tdCells
        });
    }

    return footerRows;
};

export {
    buildFooterRows
};

export default buildFooterRows;
