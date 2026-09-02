import getTh from "./getTh.js";

/**
 * Helper: Generates summary <tr> row spec containing <th> cell specs for all columns
 */
export const getRow = ({ inSummaryConfig, inColumns, inData, inTrSpec, inThSpec }) => {
    const localSummaryConfig = inSummaryConfig || {};
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const funcType = localSummaryConfig[keyName];

        return getTh({
            inColumnKey: keyName,
            inFuncType: funcType,
            inData: localData,
            inThSpec: localThSpec
        });
    });

    return trNode;
};

export default getRow;
