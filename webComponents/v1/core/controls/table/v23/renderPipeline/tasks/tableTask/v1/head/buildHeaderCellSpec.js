/**
 * Helper: Builds individual <th> header cell spec from column item
 */
export const buildHeaderCellSpec = ({ inColumn, inThSpec }) => {
    const localColumn = inColumn;
    const localThSpec = inThSpec;

    const thNode = JSON.parse(JSON.stringify(localThSpec));
    thNode.textContent = typeof localColumn === "object"
        ? (localColumn.label || localColumn.field || localColumn.name)
        : localColumn;

    return thNode;
};

export default buildHeaderCellSpec;
