import getObject from "./getObject.js";
import getRow from "./getRow.js";

/**
 * Summary Row Module (v3): Two-phase builder
 * Phase 1: Create summary key-value data object (getObject)
 * Phase 2: Render <tr> row spec by looping through data object (getRow)
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

    // Phase 1: Build data object
    const summaryDataObject = getObject({
        inSummaryConfig: localSummaryConfig,
        inColumns: localColumns,
        inData: localData
    });

    // Phase 2: Build DOM row spec from data object
    return getRow({
        inSummaryDataObject: summaryDataObject,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });
};

export { getObject, getRow };
export default getSummaryRow;
