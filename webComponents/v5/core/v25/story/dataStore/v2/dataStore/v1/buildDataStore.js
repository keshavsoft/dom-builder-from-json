/**
 * Root Data Store Module (v1)
 * Manages pristine originalData as Single Source of Truth
 */
export const buildRootDataStore = ({ inData }) => {
    const localData = inData || [];
    const originalData = localData;

    return {
        getOriginalData: () => originalData
    };
};

/**
 * Renderer Data Store Module (v1)
 * Manages UI data slices (stateData, filteredData, sortedData) with getters/setters
 */
export const buildTableDataStore = ({ inData }) => {
    const localData = inData || [];

    let stateData = localData;
    let filteredData = null;
    let sortedData = null;

    return {
        getStateData: () => stateData,
        getFilteredData: () => filteredData,
        getSortedData: () => sortedData,

        setStateData: ({ inData: inNewStateData }) => {
            const localNewState = inNewStateData || [];
            stateData = localNewState;
            return stateData;
        },
        setFilteredData: ({ inData: inNewFilteredData }) => {
            const localNewFiltered = inNewFilteredData;
            filteredData = localNewFiltered;
            return filteredData;
        },
        setSortedData: ({ inData: inNewSortedData }) => {
            const localNewSorted = inNewSortedData;
            sortedData = localNewSorted;
            return sortedData;
        }
    };
};

export const buildDataStore = ({ inData }) => {
    const localData = inData || [];
    const rootStoreObj = buildRootDataStore({ inData: localData });
    const tableStoreObj = buildTableDataStore({ inData: localData });

    return {
        rootDataStore: rootStoreObj,
        tableDataStore: tableStoreObj
    };
};

export default buildDataStore;
