/**
 * Helper: Builds individual <th> header cell spec from column item
 */
export const buildHeaderCellSpec = ({ inColumn, inThSpec, inColumnConfig }) => {
    const localColumn = inColumn;
    const localThSpec = inThSpec;
    const localHeaderConfig = inColumnConfig;

    const thNode = JSON.parse(JSON.stringify(localThSpec));

    thNode.textContent = typeof localColumn === "object"
        ? (localColumn.label || localColumn.field || localColumn.name)
        : localColumn;

    thNode.attributes.style = localHeaderConfig?.attributes?.style;
    thNode.textContent = localHeaderConfig?.textContent || thNode.textContent;

    return thNode;
};

export default buildHeaderCellSpec;
