import getRow from "./getRow.js";

/**
 * Summary Row Module (v2): Self-contained summary row builder with explanatory function names
 */
export const getSummaryRow = ({ inSummaryConfig, inColumns, inData, inTrSpec, inThSpec }) => {
    const localSummaryConfig = inSummaryConfig;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localSummaryConfig || typeof localSummaryConfig !== "object" || !localTrSpec || !localThSpec) {
        return null;
    }

    return getRow({
        inSummaryConfig: localSummaryConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });
};

export { getRow };
export default getSummaryRow;
