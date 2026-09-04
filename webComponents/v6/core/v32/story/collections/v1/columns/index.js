/**
 * Builds the canonical columns collection for UI consumers
 * Follows in -> local parameter naming convention
 */
export const buildColumnsCollection = ({ inColumnsConfig }) => {
    const localColumnsConfig = inColumnsConfig;

    if (!Array.isArray(localColumnsConfig)) {
        return [];
    }

    return localColumnsConfig.map(column => {
        if (typeof column === "string") {
            return {
                key: column,
                label: column,
                type: "text"
            };
        }

        const key = column.key || "";
        const label = column.label || key;
        const type = column.type || "text";

        return {
            ...column,
            key,
            label,
            type
        };
    });
};

export default buildColumnsCollection;
