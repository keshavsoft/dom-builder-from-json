/**
 * Helper: Applies sortable attributes and click event to <th> spec node
 */
const applySortable = ({ inThNode, inColumnKey }) => {
    const localThNode = inThNode;
    const localColumnKey = inColumnKey;

    const currentStyle = localThNode.attributes.style || "";
    localThNode.attributes.style = `${currentStyle} cursor: pointer;`.trim();
    localThNode.attributes["data-column-key"] = localColumnKey;

    localThNode.events = {
        click: () => {
            console.log("Header clicked for column:", localColumnKey);
        }
    };
};

/**
 * Helper: Builds individual <th> header cell spec from column item
 */
export const buildHeaderCellSpec = ({ inColumn, inThSpec, inColumnConfig }) => {
    const localColumn = inColumn;
    const localThSpec = inThSpec;
    const localHeaderConfig = inColumnConfig;

    const isSortable = localHeaderConfig?.isSortable;

    const thNode = JSON.parse(JSON.stringify(localThSpec));

    thNode.textContent = typeof localColumn === "object"
        ? (localColumn.label || localColumn.field || localColumn.name)
        : localColumn;

    if (localHeaderConfig?.attributes?.style) {
        thNode.attributes.style = localHeaderConfig.attributes.style;
    }
    thNode.textContent = localHeaderConfig?.textContent || thNode.textContent;

    if (isSortable) {
        const columnKey = typeof localColumn === "object" ? localColumn.key : localColumn;
        applySortable({ inThNode: thNode, inColumnKey: columnKey });
    }

    return thNode;
};

export default buildHeaderCellSpec;
