/**
 * Prepares pure Card Data Model from columns configuration
 * Generates card items from columns
 * Follows in -> local parameter naming convention
 */
export const buildCardDataModel = ({ inColumns }) => {
    const localColumns = inColumns;

    if (!Array.isArray(localColumns)) {
        return { cards: [] };
    }

    const cards = localColumns.map(column => {
        if (typeof column === "string") {
            return {
                key: column,
                label: column,
                type: "column"
            };
        }

        const key = column.key || "";
        const label = column.label || key;
        const type = column.type || "column";

        return {
            key,
            label,
            type
        };
    });

    return {
        cards
    };
};

export default buildCardDataModel;
