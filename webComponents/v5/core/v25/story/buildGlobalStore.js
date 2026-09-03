/**
 * Helper: Builds root global store containing ONLY pristine Single Sources of Truth (originalData & originalColumnsConfig)
 */
export const buildGlobalStore = ({ inData, inColumnsConfig }) => {
    const localData = inData || [];
    const localColumnsConfig = inColumnsConfig || [];

    const originalData = localData;
    const originalColumnsConfig = localColumnsConfig;

    return {
        dataStore: {
            getOriginalData: () => originalData
        },
        columnsStore: {
            getOriginalColumnsConfig: () => originalColumnsConfig
        }
    };
};

export default buildGlobalStore;
