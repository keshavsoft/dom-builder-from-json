/**
 * Builds the canonical rows collection for UI consumers
 * Keeps data fields aligned with the columns collection, resolving direct or dotted paths
 * Follows in -> local parameter naming convention
 */
export const buildRowsCollection = ({ inData, inColumns }) => {
    const localData = inData;
    const localColumns = inColumns;

    if (!Array.isArray(localData)) {
        return [];
    }

    const columnKeys = Array.isArray(localColumns)
        ? localColumns.map(col => (typeof col === "string" ? col : col.key))
        : [];

    return localData.map(row => {
        if (!row || typeof row !== "object") {
            return {};
        }

        // If columns provided, project row against column keys
        if (columnKeys.length > 0) {
            const projectedRow = {};

            columnKeys.forEach(key => {
                if (!key) return;

                if (key in row) {
                    projectedRow[key] = row[key];
                } else {
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
        }

        return { ...row };
    });
};

export default buildRowsCollection;
