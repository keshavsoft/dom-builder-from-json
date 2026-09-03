/**
 * Helper: Maps requested column keys against columnsConfig metadata objects
 */
export const resolveFilteredColumns = ({ inRequestedKeys, inColumnsConfig }) => {
    const localRequestedKeys = inRequestedKeys || [];
    const localColumnsConfig = inColumnsConfig || [];

    return localRequestedKeys.map(key => {
        const keyStr = typeof key === "object" ? (key.key || key.field || key.name) : key;
        const matchedConfig = localColumnsConfig.find(col => col && (col.key === keyStr || col.field === keyStr || col.name === keyStr));
        return matchedConfig ? { ...matchedConfig, key: keyStr } : key;
    });
};

export default resolveFilteredColumns;
