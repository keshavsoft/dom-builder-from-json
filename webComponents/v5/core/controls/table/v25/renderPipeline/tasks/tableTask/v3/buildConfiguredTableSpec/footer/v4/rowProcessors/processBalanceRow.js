import { getObject as getSummaryObject } from "../summaryRow/index.js";
import { getObject as getBalanceObject, buildRowSpec as buildBalanceRowSpec } from "../balanceRow/index.js";

export const processBalanceRow = ({ inFooterConfig, inColumns, inData, inTrSpec, inThSpec }) => {
    const localFooterConfig = inFooterConfig || {};
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localFooterConfig.balanceRow || typeof localFooterConfig.balanceRow !== "object") {
        return null;
    }

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

    if (!balanceData) return null;

    return buildBalanceRowSpec({
        inDataObject: balanceData,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });
};

export default processBalanceRow;
