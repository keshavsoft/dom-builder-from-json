import { getObject as getSummaryObject, buildRowSpec as buildSummaryRowSpec } from "../summaryRow/index.js";

export const processSummaryRow = ({ inFooterConfig, inColumns, inData, inTrSpec, inThSpec }) => {
    const localFooterConfig = inFooterConfig || {};
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localFooterConfig.summaryRow || typeof localFooterConfig.summaryRow !== "object") {
        return null;
    }

    const summaryData = getSummaryObject({
        inSummaryConfig: localFooterConfig.summaryRow,
        inColumns: localColumns,
        inData: localData
    });

    if (!summaryData) return null;

    return buildSummaryRowSpec({
        inDataObject: summaryData,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });
};

export default processSummaryRow;
