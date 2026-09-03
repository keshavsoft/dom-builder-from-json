/**
 * Step 2: Generates <tr> row spec containing <th> cell specs by looping through summary data object
 */
export const getRow = ({ inSummaryDataObject, inColumns, inTrSpec, inThSpec }) => {
    const localSummaryDataObject = inSummaryDataObject || {};
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const cellValue = localSummaryDataObject[keyName] !== undefined
            ? localSummaryDataObject[keyName]
            : "";

        const thNode = JSON.parse(JSON.stringify(localThSpec));
        thNode.textContent = String(cellValue);
        return thNode;
    });

    return trNode;
};

export default getRow;
