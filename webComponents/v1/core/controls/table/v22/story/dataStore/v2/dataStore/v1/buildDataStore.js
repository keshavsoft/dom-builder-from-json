/**
 * Row Data State Module (v1)
 * Manages originalData, stateData, filteredData, and sortedData state buckets with getters/setters
 */
export const buildDataStore = ({ inData }) => {
    const localData = inData || [];

    let originalData = localData;
    let stateData = localData;
    let filteredData = null;
    let sortedData = null;

    return {
        getOriginalData: () => originalData,
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

export default buildDataStore;
