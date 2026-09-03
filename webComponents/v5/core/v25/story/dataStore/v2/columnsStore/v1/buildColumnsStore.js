const resolveFilteredColumns = ({ inRequestedKeys, inColumnsConfig }) => {
    const localRequestedKeys = inRequestedKeys || [];
    const localColumnsConfig = inColumnsConfig || [];

    return localRequestedKeys.map(key => {
        const keyStr = typeof key === "object" ? (key.key || key.field || key.name) : key;
        const matchedConfig = localColumnsConfig.find(col => col && (col.key === keyStr || col.field === keyStr || col.name === keyStr));
        return matchedConfig ? { ...matchedConfig, key: keyStr } : key;
    });
};

/**
 * Column Metadata State Module (v1)
 * Manages columnsConfig and activeColumns with getters/setters
 */
export const buildColumnsStore = ({ inAllColumnsConfig, inConfig }) => {
    const localAllColumnsConfig = inAllColumnsConfig || [];
    const tableColumns = inConfig?.columns;

    const tableColumnsConfig = resolveFilteredColumns({
        inRequestedKeys: tableColumns,
        inColumnsConfig: localAllColumnsConfig
    });

    // console.log("inConfig----------- : ", tableColumnsConfig);

    return {
        getColumnsConfig: () => tableColumnsConfig
    };
};

export default buildColumnsStore;
