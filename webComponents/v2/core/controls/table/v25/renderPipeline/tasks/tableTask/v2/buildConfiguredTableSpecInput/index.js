import resolveFilteredColumns from "./resolveFilteredColumns.js";
import prepareTableData from "./prepareTableData.js";
import resolveFooterConfig from "./resolveFooterConfig.js";

/**
 * Story Orchestrator: Prepares and returns the structured input object contract expected by buildConfiguredTableSpec
 */
export const buildConfiguredTableSpecInput = ({
    inDomTreeSpecs,
    inStore,
    inRendererConfig
}) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localStore = inStore;
    const localRendererConfig = inRendererConfig;

    const requestedKeys = localRendererConfig?.columns || [];
    const tableStore = localStore?.renderersStore?.table?.store;

    // Pull data: preferred from renderer filteredData / stateData, or fallback to root originalData
    const filteredData = tableStore?.dataStore?.getFilteredData();
    const rawData = (Array.isArray(filteredData) && filteredData.length >= 0 && filteredData !== null)
        ? filteredData
        : (localStore?.store?.dataStore?.getOriginalData() || localStore?.dataStore?.getOriginalData() || []);

    // Pull columnsConfig: preferred from renderer columnsStore, or fallback to root originalColumnsConfig
    const columnsConfig = tableStore?.columnsStore?.getColumnsConfig()
        || localStore?.store?.columnsStore?.getOriginalColumnsConfig()
        || [];

    // Step 1: Resolve filtered columns metadata objects
    const filteredColumns = resolveFilteredColumns({
        inRequestedKeys: requestedKeys,
        inColumnsConfig: columnsConfig
    });

    // Step 2: Prepare new row objects containing only requested columns
    const tableData = prepareTableData({
        inData: rawData,
        inColumns: filteredColumns
    });

    // Step 3: Resolve footer configuration & presence flags
    const footerInfo = resolveFooterConfig({
        inRendererConfig: localRendererConfig
    });

    return {
        inDomTreeSpecs: localDomTreeSpecs,
        inColumns: filteredColumns,
        inData: tableData,
        inHasFooterConfig: footerInfo.hasFooterConfig,
        inFooterConfig: footerInfo.footerConfig
    };
};

export default buildConfiguredTableSpecInput;
