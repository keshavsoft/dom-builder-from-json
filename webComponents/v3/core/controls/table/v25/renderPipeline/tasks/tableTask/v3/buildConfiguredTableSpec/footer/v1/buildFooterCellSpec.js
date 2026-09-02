/**
 * Helper: Builds individual <th>/<td> footer cell spec
 */
export const buildFooterCellSpec = ({ inCellConfig, inThSpec }) => {
    const localCellConfig = inCellConfig || {};
    const localThSpec = inThSpec;

    const cellNode = JSON.parse(JSON.stringify(localThSpec));
    if (localCellConfig.colspan) {
        cellNode.attributes = cellNode.attributes || {};
        cellNode.attributes.colspan = String(localCellConfig.colspan);
    }
    cellNode.textContent = localCellConfig.label || localCellConfig.textContent || "";

    return cellNode;
};

export default buildFooterCellSpec;
