/**
 * Stage: Prepares projected tBody row objects
 * Keeps only the data fields defined in inColumns
 * Follows in -> local parameter naming convention
 */

export const prepareBody = ({ inData, inColumns }) => {
    const localData = inData;
    const localColumns = inColumns;

    if (!Array.isArray(localData) || !Array.isArray(localColumns)) {
        return [];
    }

    const columnKeys = localColumns.map(col => typeof col === "string" ? col : col.key);

    return localData.map(row => {
        const projectedRow = {};

        columnKeys.forEach(key => {
            if (!key) return;

            // Direct key access or path traversal
            if (key in row) {
                projectedRow[key] = row[key];
            } else {
                // Fallback dotted path lookup if nested
                const parts = key.split(".");
                let current = row;
                for (const part of parts) {
                    if (current && typeof current === "object" && part in current) {
                        current = current[part];
                    } else {
                        current = undefined;
                        break;
                    }
                }
                projectedRow[key] = current;
            }
        });

        return projectedRow;
    });
};

export default prepareBody;
