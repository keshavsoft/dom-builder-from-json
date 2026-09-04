import buildTableDataModel from "../../../renderPipeline/tasks/tableTask/v10/dataModel/index.js";
import buildFormDataModel from "../../../renderPipeline/tasks/formTask/v2/dataModel/index.js";

const modelBuildersMap = {
    table: ({ inStore, inConfig, inFallbackData, inFallbackColumns }) => {
        const localStore = inStore;
        const localConfig = inConfig;
        const localFallbackData = inFallbackData;
        const localFallbackColumns = inFallbackColumns;

        const columns = localStore?.columnsStore?.getColumnsConfig?.() || localFallbackColumns || [];
        const data = localStore?.dataStore?.getStateData?.() || localStore?.dataStore?.getOriginalData?.() || localFallbackData || [];
        const footerConfig = localConfig?.footer;

        return buildTableDataModel({
            inColumns: columns,
            inData: data,
            inFooterConfig: footerConfig
        });
    },

    form: ({ inStore, inFallbackColumns }) => {
        const localStore = inStore;
        const localFallbackColumns = inFallbackColumns;

        const columns = localStore?.columnsStore?.getColumnsConfig() || localFallbackColumns || [];

        return buildFormDataModel({
            inColumns: columns
        });
    }
};

/**
 * Builds data models for each active renderer prior to pipeline execution.
 * Follows in -> local parameter naming convention.
 */
const buildDataModels = ({
    inGlobalStore,
    inRenderersStore,
    inRenderers
} = {}) => {
    const localGlobalStore = inGlobalStore || {};
    const localRenderersStore = inRenderersStore || {};
    const localRenderers = inRenderers || {};

    const fallbackData = localGlobalStore?.dataStore?.getOriginalData?.() || [];
    const fallbackColumns = localGlobalStore?.columnsConfig || [];

    const dataModels = {};

    for (const [rendererKey, rendererStoreObj] of Object.entries(localRenderersStore)) {
        if (rendererKey in modelBuildersMap) {
            const rendererStore = rendererStoreObj?.store;
            const rendererConfig = localRenderers[rendererKey];

            dataModels[rendererKey] = modelBuildersMap[rendererKey]({
                inStore: rendererStore,
                inConfig: rendererConfig,
                inFallbackData: fallbackData,
                inFallbackColumns: fallbackColumns
            });
        }
    }

    return dataModels;
};

export {
    buildDataModels
};

export default buildDataModels;
