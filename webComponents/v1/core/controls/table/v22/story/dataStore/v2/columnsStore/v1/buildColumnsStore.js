/**
 * Column Metadata State Module (v1)
 * Manages columnsConfig and activeColumns with getters/setters
 */
export const buildColumnsStore = ({ inColumnsConfig }) => {
    const localColumnsConfig = inColumnsConfig || [];
    let columnsConfig = localColumnsConfig;
    let activeColumns = localColumnsConfig;

    return {
        getColumnsConfig: () => columnsConfig,
        getActiveColumns: () => activeColumns,

        setColumnsConfig: ({ inColumnsConfig: inNewConfig }) => {
            const localNewConfig = inNewConfig || [];
            columnsConfig = localNewConfig;
            return columnsConfig;
        },
        setActiveColumns: ({ inActiveColumns: inNewActive }) => {
            const localNewActive = inNewActive || [];
            activeColumns = localNewActive;
            return activeColumns;
        }
    };
};

export default buildColumnsStore;
