import buildSummaryRowCellSpec from "./buildSummaryRowCellSpec.js";

/**
 * Helper: Builds <tr> summary row spec containing <th> cell specs for all columns
 */
export const buildSummaryRowSpec = ({ inSummaryConfig, inColumns, inData, inTrSpec, inThSpec }) => {
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

        return buildSummaryRowCellSpec({
            inColumnKey: keyName,
            inFuncType: funcType,
            inData: localData,
            inThSpec: localThSpec
        });
    });

    return trNode;
};

export default buildSummaryRowSpec;
