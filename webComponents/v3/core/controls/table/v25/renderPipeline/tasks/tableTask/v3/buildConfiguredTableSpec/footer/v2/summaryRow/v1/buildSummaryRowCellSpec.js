import calculateAggregate from "./aggregateFunctions.js";

/**
 * Helper: Builds individual <th> summary row cell spec for a column
 */
export const buildSummaryRowCellSpec = ({ inColumnKey, inFuncType, inData, inThSpec }) => {
    const localColumnKey = inColumnKey;
    const localFuncType = inFuncType;
    const localData = inData || [];
    const localThSpec = inThSpec;

    const cellText = calculateAggregate({
        inData: localData,
        inColumnKey: localColumnKey,
        inFuncType: localFuncType
    });

    const thNode = JSON.parse(JSON.stringify(localThSpec));
    thNode.textContent = cellText;

    return thNode;
};

export default buildSummaryRowCellSpec;
