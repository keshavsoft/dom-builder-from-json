import { findProcessor } from "./rowProcessors/index.js";

/**
 * Orchestrates table footer rows by delegating to specialized row processors
 * Supports summaryRow, balanceRow, inputsRow, and any future registered row processors.
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

    const footerRows = [];
    const summaryData = {};

    for (const [rowKey, rowConfig] of Object.entries(localFooterConfig)) {
        if (!rowConfig) {
            continue;
        }

        const processor = findProcessor({ inRowKey: rowKey });

        if (typeof processor === "function") {
            const rows = processor({
                inRowConfig: rowConfig,
                inRowKey: rowKey,
                inColumns: localColumns,
                inData: localData,
                inTemplates: localTemplates,
                inSummaryData: summaryData
            });

            if (Array.isArray(rows) && rows.length > 0) {
                footerRows.push(...rows);

                if (rowKey === "summaryRow") {
                    rows[0].children?.forEach((td, idx) => {
                        const col = localColumns[idx];
                        if (col?.key) {
                            summaryData[col.key] = td.textContent;
                        }
                    });
                }
            }
        }
    }

    return footerRows;
};

export {
    buildFooterRows
};

export default buildFooterRows;
