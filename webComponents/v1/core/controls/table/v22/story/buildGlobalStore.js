import buildDataStore from "./dataStore/index.js";

/**
 * Helper: Builds global store containing dataStore and columnsStore
 */
export const buildGlobalStore = ({ inData, inColumnsConfig }) => {
    const localData = inData || [];
    const localColumnsConfig = inColumnsConfig || [];

    return buildDataStore({
        inData: localData,
        inColumnsConfig: localColumnsConfig
    });
};

export default buildGlobalStore;
