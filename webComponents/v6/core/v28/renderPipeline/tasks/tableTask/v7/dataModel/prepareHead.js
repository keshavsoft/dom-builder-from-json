/**
 * Stage: Prepares normalized tHead column metadata
 * Follows in -> local parameter naming convention
 */

export const prepareHead = ({ inColumns }) => {
    const localColumns = inColumns;

    if (!Array.isArray(localColumns)) {
        return [];
    }

    return localColumns.map(column => {
        if (typeof column === "string") {
            return {
                key: column,
                label: column,
                type: "text"
            };
        }

        return {
            key: column.key || "",
            label: column.label ?? column.key ?? "",
            type: column.type || "text"
        };
    });
};

export default prepareHead;
