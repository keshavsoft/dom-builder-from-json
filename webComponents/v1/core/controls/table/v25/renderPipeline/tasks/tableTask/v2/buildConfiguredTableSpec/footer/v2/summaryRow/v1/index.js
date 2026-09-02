import buildSummaryRowSpec from "./buildSummaryRowSpec.js";

/**
 * Summary Row Module (v1): Builds and returns summary <tr> row spec
 */
export const buildSummaryRow = ({ inSummaryConfig, inColumns, inData, inTrSpec, inThSpec }) => {
    const localSummaryConfig = inSummaryConfig;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localSummaryConfig || typeof localSummaryConfig !== "object" || !localTrSpec || !localThSpec) {
        return null;
    }

    return buildSummaryRowSpec({
        inSummaryConfig: localSummaryConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });
};

export default buildSummaryRow;
