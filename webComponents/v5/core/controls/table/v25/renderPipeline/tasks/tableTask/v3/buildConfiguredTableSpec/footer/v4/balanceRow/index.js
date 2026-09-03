import getObject from "./getObject.js";
import buildRowSpec from "./buildRowSpec.js";

/**
 * Self-contained Balance Row Module for footer/v3
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

export { getObject, buildRowSpec };
export default getBalanceRow;
