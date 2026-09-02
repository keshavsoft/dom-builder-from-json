import { getObject as getSummaryObject } from "./summaryRow/v3/index.js";
import { getObject as getBalanceObject } from "./balanceRow/v1/index.js";
import buildFooterRowSpec from "./buildFooterRowSpec.js";

/**
 * Footer Module (v2): Pure function returning <tfoot> <tr> row specs array or null
 * Uses a single shared row builder (buildFooterRowSpec) to convert calculated data objects into row specs.
 */
export const buildFooter = ({
    inFooterConfig,
    inHasFooterConfig,
    inColumns,
    inData,
    inTrSpec,
    inThSpec
}) => {
    const localFooterConfig = inFooterConfig;
    const localHasFooterConfig = inHasFooterConfig;
    const localColumns = inColumns;
    const localData = inData;
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localHasFooterConfig || !localFooterConfig || typeof localFooterConfig !== "object") {
        return null;
    }

    const footerRows = [];
    let summaryRowObject = {};

    // 1. Process summaryRow configuration
    if (localFooterConfig.summaryRow && typeof localFooterConfig.summaryRow === "object") {
        summaryRowObject = getSummaryObject({
            inSummaryConfig: localFooterConfig.summaryRow,
            inColumns: localColumns,
            inData: localData
        });

        const summaryRowSpec = buildFooterRowSpec({
            inDataObject: summaryRowObject,
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec
        });

        if (summaryRowSpec) {
            footerRows.push(summaryRowSpec);
        }
    }

    // 2. Process balanceRow configuration (Purely depends on summaryRowObject, no inData)
    if (localFooterConfig.balanceRow && typeof localFooterConfig.balanceRow === "object") {
        const balanceDataObject = getBalanceObject({
            inBalanceConfig: localFooterConfig.balanceRow,
            inColumns: localColumns,
            inSummaryRowObject: summaryRowObject
        });

        const balanceRowSpec = buildFooterRowSpec({
            inDataObject: balanceDataObject,
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec
        });

        if (balanceRowSpec) {
            footerRows.push(balanceRowSpec);
        }
    }

    return footerRows;
};

export default buildFooter;
