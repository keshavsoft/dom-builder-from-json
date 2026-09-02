/**
 * Pure DataStore Builder (v1)
 * Normalizes input dataset into structured dataStore tracking buckets
 */
export const buildDataStore = ({ inData, inColumnsConfig }) => {
    const localData = inData || [];
    const localColumnsConfig = inColumnsConfig || [];

    return {
        originalData: localData,
        filteredData: localData,
        sortedData: localData,
        stateData: localData,
        columnsConfig: localColumnsConfig
    };
};

export default buildDataStore;
