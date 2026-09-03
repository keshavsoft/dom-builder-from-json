import getObject from "./getObject.js";
import buildRowSpec from "./buildRowSpec.js";

/**
 * Self-contained Summary Row Module for footer/v3
 */
export const getSummaryRow = ({ inSummaryConfig, inColumns, inData }) => {
    const localSummaryConfig = inSummaryConfig;
    const localColumns = inColumns || [];
    const localData = inData || [];

    if (!localSummaryConfig || typeof localSummaryConfig !== "object") {
        return null;
    }

    return getObject({
        inSummaryConfig: localSummaryConfig,
        inColumns: localColumns,
        inData: localData
    });
};

export { getObject, buildRowSpec };
export default getSummaryRow;
