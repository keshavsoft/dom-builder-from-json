import buildHeaderCellSpec from "./buildHeaderCellSpec.js";

/**
 * Helper: Builds <tr> header row spec containing <th> cell specs
 */
export const buildHeaderRowSpec = ({ inColumns, inTrSpec, inThSpec }) => {
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(column =>
        buildHeaderCellSpec({ inColumn: column, inThSpec: localThSpec })
    );

    return trNode;
};

export default buildHeaderRowSpec;
