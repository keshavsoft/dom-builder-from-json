import { getObject as getSummaryObject, buildRowSpec as buildSummaryRowSpec } from "./summaryRow/index.js";
import { getObject as getBalanceObject, buildRowSpec as buildBalanceRowSpec } from "./balanceRow/index.js";
import { getObject as getInputsObject, buildRowSpec as buildInputsRowSpec } from "./inputsRow/index.js";

/**
 * Footer Module (v3): Pure Orchestrator
 * Step 1: Collects data objects and builds row specs for each row category:
 *   - summaryRow: renders text values in <th>
 *   - balanceRow: renders formula values in <th>
 *   - inputsRow: renders <input> elements in <th>
 */
export const buildFooter = ({
    inFooterConfig,
    inHasFooterConfig,
    inColumns,
    inData,
    inTrSpec,
    inThSpec,
    inInputSpec
}) => {
    const localFooterConfig = inFooterConfig;
    const localHasFooterConfig = inHasFooterConfig;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localInputSpec = inInputSpec;

    if (!localHasFooterConfig || !localFooterConfig || typeof localFooterConfig !== "object") {
        return null;
    }

    const footerRowSpecs = [];

    // 1. Process summaryRow (Summary totals text display)
    if (localFooterConfig.summaryRow && typeof localFooterConfig.summaryRow === "object") {
        const summaryData = getSummaryObject({
            inSummaryConfig: localFooterConfig.summaryRow,
            inColumns: localColumns,
            inData: localData
        });
        if (summaryData) {
            const rowSpec = buildSummaryRowSpec({
                inDataObject: summaryData,
                inColumns: localColumns,
                inTrSpec: localTrSpec,
                inThSpec: localThSpec
            });
            if (rowSpec) footerRowSpecs.push(rowSpec);
        }
    }

    // 2. Process balanceRow (Balance formulas text display, uses summaryData)
    if (localFooterConfig.balanceRow && typeof localFooterConfig.balanceRow === "object") {
        const summaryData = getSummaryObject({
            inSummaryConfig: localFooterConfig.summaryRow,
            inColumns: localColumns,
            inData: localData
        }) || {};

        const balanceData = getBalanceObject({
            inBalanceConfig: localFooterConfig.balanceRow,
            inColumns: localColumns,
            inSummaryRowObject: summaryData
        });
        if (balanceData) {
            const rowSpec = buildBalanceRowSpec({
                inDataObject: balanceData,
                inColumns: localColumns,
                inTrSpec: localTrSpec,
                inThSpec: localThSpec
            });
            if (rowSpec) footerRowSpecs.push(rowSpec);
        }
    }

    // 3. Process inputsRow (Input text fields)
    if (localFooterConfig.inputsRow) {
        const inputsData = getInputsObject({
            inInputsConfig: localFooterConfig.inputsRow,
            inColumns: localColumns
        });
        const inputsArray = Array.isArray(inputsData) ? inputsData : [inputsData].filter(Boolean);

        inputsArray.forEach(dataObj => {
            const rowSpec = buildInputsRowSpec({
                inDataObject: dataObj,
                inColumns: localColumns,
                inTrSpec: localTrSpec,
                inThSpec: localThSpec,
                inInputSpec: localInputSpec
            });
            if (rowSpec) footerRowSpecs.push(rowSpec);
        });
    }

    return footerRowSpecs;
};

export default buildFooter;
