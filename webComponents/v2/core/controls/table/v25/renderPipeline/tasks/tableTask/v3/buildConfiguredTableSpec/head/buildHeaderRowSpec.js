import buildHeaderCellSpec from "./buildHeaderCellSpec.js";

/**
 * Helper: Builds <tr> header row spec containing <th> cell specs
 */
export const buildHeaderRowSpec = ({ inHeaderConfig, inColumns, inTrSpec, inThSpec }) => {
    const localHeaderConfig = inHeaderConfig;
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));

    trNode.children = localColumns.map(column => {
        return buildHeaderCellSpec({
            inColumn: column, inThSpec: localThSpec,
            inColumnConfig: localHeaderConfig[column?.key]
        })
    });

    return trNode;
};

export default buildHeaderRowSpec;
