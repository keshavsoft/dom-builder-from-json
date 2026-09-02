/**
 * Shared Footer Helper: Converts any calculated data object into a <tr> row spec
 */
export const buildFooterRowSpec = ({ inDataObject, inColumns, inTrSpec, inThSpec }) => {
    const localDataObject = inDataObject || {};
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localTrSpec || !localThSpec) {
        return null;
    }

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const cellValue = localDataObject[keyName] !== undefined
            ? localDataObject[keyName]
            : "";

        const thNode = JSON.parse(JSON.stringify(localThSpec));
        thNode.textContent = String(cellValue);
        return thNode;
    });

    return trNode;
};

export default buildFooterRowSpec;
