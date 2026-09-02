/**
 * Helper: Builds new row objects containing only keys matching the active/requested columns
 */
export const prepareTableData = ({ inData, inColumns }) => {
    const localData = Array.isArray(inData) ? inData : [];
    const localColumns = Array.isArray(inColumns) ? inColumns : [];

    if (localColumns.length === 0) {
        return localData;
    }

    const columnKeys = localColumns.map(col => typeof col === "object" ? (col.key || col.field || col.name) : col);

    return localData.map(row => {
        const newRow = {};
        columnKeys.forEach(key => {
            newRow[key] = row && (key in row) ? row[key] : "";
        });
        return newRow;
    });
};

export default prepareTableData;
