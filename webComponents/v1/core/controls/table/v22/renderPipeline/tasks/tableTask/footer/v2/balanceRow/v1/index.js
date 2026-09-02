import getObject from "./getObject.js";
import getRow from "./getRow.js";

/**
 * Balance Row Module (v1): Self-contained balance row calculator
 * Purely relies on inSummaryRowObject and never takes dataset (inData).
 */
export const getBalanceRow = ({ inBalanceConfig, inColumns, inTrSpec, inThSpec, inSummaryRowObject }) => {
    const localBalanceConfig = inBalanceConfig;
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localSummaryRowObject = inSummaryRowObject || {};

    if (!localBalanceConfig || typeof localBalanceConfig !== "object") {
        return null;
    }

    const balanceDataObject = getObject({
        inBalanceConfig: localBalanceConfig,
        inColumns: localColumns,
        inSummaryRowObject: localSummaryRowObject
    });

    if (!localTrSpec || !localThSpec) {
        return balanceDataObject;
    }

    return getRow({
        inConfig: localBalanceConfig,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec,
        inSummaryRowObject: localSummaryRowObject
    });
};

export { getObject, getRow };
export default getBalanceRow;
