import buildFooterCellSpec from "./buildFooterCellSpec.js";

/**
 * Helper: Builds <tr> footer row spec containing cell specs
 */
export const buildFooterRowSpec = ({ inFooterCells, inTrSpec, inThSpec }) => {
    const localFooterCells = inFooterCells || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localFooterCells.map(cellConfig =>
        buildFooterCellSpec({ inCellConfig: cellConfig, inThSpec: localThSpec })
    );

    return trNode;
};

export default buildFooterRowSpec;
