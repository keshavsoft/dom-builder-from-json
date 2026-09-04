import buildDataStoreModule from "./dataStore/v1/buildDataStore.js";
import buildColumnsStoreModule from "./columnsStore/v1/buildColumnsStore.js";

/**
 * Store Orchestrator (v2)
 * Combines dataStore and columnsStore into unified store object
 */
export const buildDataStore = ({ inData, inColumnsConfig }) => {
    const localData = inData || [];
    const localColumnsConfig = inColumnsConfig || [];

    const dataStoreObj = buildDataStoreModule({ inData: localData });
    const columnsStoreObj = buildColumnsStoreModule({ inColumnsConfig: localColumnsConfig });

    return {
        dataStore: dataStoreObj,
        columnsStore: columnsStoreObj
    };
};

export default buildDataStore;
