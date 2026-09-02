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
    const rawData = localStore?.dataStore?.getOriginalData() || [];
    const columnsConfig = localStore?.columnsStore?.getColumnsConfig() || [];

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
