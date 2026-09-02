import getTh from "./getTh.js";

/**
 * Helper: Generates balance <tr> row spec containing <th> cell specs for all columns
 */
export const getRow = ({ inConfig, inColumns, inTrSpec, inThSpec, inSummaryRowObject }) => {
    const localConfig = inConfig || {};
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localSummaryRowObject = inSummaryRowObject || {};

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const funcType = localConfig[keyName];

        return getTh({
            inColumnKey: keyName,
            inFuncType: funcType,
            inThSpec: localThSpec,
            inSummaryRowObject: localSummaryRowObject
        });
    });

    return trNode;
};

export default getRow;
