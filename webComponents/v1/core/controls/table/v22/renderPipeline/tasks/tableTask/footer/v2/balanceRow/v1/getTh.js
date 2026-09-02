import evaluateBalance from "./evaluateBalance.js";

/**
 * Helper: Generates individual <th> balance cell spec for a column
 */
export const getTh = ({ inColumnKey, inFuncType, inThSpec, inSummaryRowObject }) => {
    const localColumnKey = inColumnKey;
    const localFuncType = inFuncType;
    const localThSpec = inThSpec;
    const localSummaryRowObject = inSummaryRowObject || {};

    const cellText = evaluateBalance({
        inColumnKey: localColumnKey,
        inFuncType: localFuncType,
        inSummaryRowObject: localSummaryRowObject
    });

    const thNode = JSON.parse(JSON.stringify(localThSpec));
    thNode.textContent = cellText;

    return thNode;
};

export default getTh;
