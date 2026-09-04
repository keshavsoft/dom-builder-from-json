/**
 * Prepares pure Form Data Model from columns configuration
 * Follows in -> local parameter naming convention
 */
export const buildFormDataModel = ({ inColumns }) => {
    const localColumns = inColumns;

    if (!Array.isArray(localColumns)) {
        return { fields: [] };
    }

    const fields = localColumns.map(column => {
        if (typeof column === "string") {
            return {
                key: column,
                label: column,
                type: "text",
                placeholder: column
            };
        }

        const key = column.key || "";
        const label = column.label || key;
        const type = column.type || "text";
        const placeholder = column.placeholder || label;

        return {
            key,
            label,
            type,
            placeholder
        };
    });

    return {
        fields
    };
};

export default buildFormDataModel;
