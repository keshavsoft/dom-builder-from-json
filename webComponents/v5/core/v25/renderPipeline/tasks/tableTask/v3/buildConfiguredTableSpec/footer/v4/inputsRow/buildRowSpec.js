export const buildRowSpec = ({ inDataObject, inColumns, inTrSpec, inThSpec, inInputSpec }) => {
    const localDataObject = inDataObject || {};
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localInputSpec = inInputSpec;

    if (!localTrSpec || !localThSpec || !localInputSpec) {
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
        const inputNode = JSON.parse(JSON.stringify(localInputSpec));
        thNode.textContent = "";

        if (cellValue !== "" && inputNode.attributes) {
            inputNode.attributes.value = cellValue;
        }

        thNode.children = [inputNode];
        return thNode;
    });

    return trNode;
};

export default buildRowSpec;
