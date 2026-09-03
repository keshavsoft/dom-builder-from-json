import prepareTableData from "./prepareTableData.js";
import resolveFooterConfig from "./resolveFooterConfig.js";

/**
 * Story Orchestrator: Prepares and returns the structured input object contract expected by buildConfiguredTableSpec
 */
export const buildConfiguredTableSpecInput = ({
    inStore,
    inTableConfig
}) => {
    const localStore = inStore;
    const localTableConfig = inTableConfig;
    const localTableDataStore = localStore.renderersStore.table.store.dataStore.getStateData();
    console.log("localStore : ", inTableConfig, localTableDataStore, localStore);

    const rawData = localStore.store.dataStore.getOriginalData();

    // Step 1: Resolve filtered columns metadata objects
    const localColumnsConfig = localStore.renderersStore.table.store.columnsStore.getColumnsConfig();

    // Step 2: Prepare new row objects containing only requested columns
    const tableData = prepareTableData({
        inData: localTableDataStore,
        inColumnsConfig: localColumnsConfig
    });

    // Step 3: Resolve footer configuration & presence flags
    const footerInfo = resolveFooterConfig({
        inTableConfig: localTableConfig
    });

    return {
        inColumns: localColumnsConfig,
        inData: tableData,
        inHasFooterConfig: footerInfo.hasFooterConfig,
        inFooterConfig: footerInfo.footerConfig
    };
};

export default buildConfiguredTableSpecInput;
