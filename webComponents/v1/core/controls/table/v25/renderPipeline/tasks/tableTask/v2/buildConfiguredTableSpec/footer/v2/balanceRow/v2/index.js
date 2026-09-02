import getObject from "./getObject.js";

/**
 * Balance Row Module (v2): Pure data object generator
 * Purely relies on inSummaryRowObject and never takes dataset (inData).
 */
export const getBalanceRow = ({ inBalanceConfig, inColumns, inSummaryRowObject }) => {
    const localBalanceConfig = inBalanceConfig;
    const localColumns = inColumns || [];
    const localSummaryRowObject = inSummaryRowObject || {};

    if (!localBalanceConfig || typeof localBalanceConfig !== "object") {
        return null;
    }

    return getObject({
        inBalanceConfig: localBalanceConfig,
        inColumns: localColumns,
        inSummaryRowObject: localSummaryRowObject
    });
};

export { getObject };
export default getBalanceRow;
