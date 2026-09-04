import buildTableDataModel from "./table/index.js";
import buildFormDataModel from "./form/index.js";
import buildCardDataModel from "./card/index.js";

const modelBuildersMap = {
    table: ({ inStore, inConfig, inFallbackData, inFallbackColumns, inCollections }) => {
        const localStore = inStore;
        const localConfig = inConfig;
        const localFallbackData = inFallbackData;
        const localFallbackColumns = inFallbackColumns;
        const localCollections = inCollections || {};

        const storeColumns = localStore?.columnsStore?.getColumnsConfig?.();
        const columns = (Array.isArray(storeColumns) && storeColumns.length > 0)
            ? storeColumns
            : (localCollections?.columns || localFallbackColumns || []);

        const data = localCollections?.rows
            || localStore?.dataStore?.getStateData?.()
            || localStore?.dataStore?.getOriginalData?.()
            || localFallbackData
            || [];
        const footerConfig = localConfig?.footer;

        return buildTableDataModel({
            inColumns: columns,
            inData: data,
            inFooterConfig: footerConfig
        });
    },

    form: ({ inStore, inFallbackColumns, inCollections }) => {
        const localStore = inStore;
        const localFallbackColumns = inFallbackColumns;
        const localCollections = inCollections || {};

        const columns = localCollections?.columns
            || localStore?.columnsStore?.getColumnsConfig()
            || localFallbackColumns
            || [];

        return buildFormDataModel({
            inColumns: columns
        });
    },

    card: ({ inStore, inFallbackColumns, inCollections }) => {
        const localStore = inStore;
        const localFallbackColumns = inFallbackColumns;
        const localCollections = inCollections || {};

        const storeColumns = localStore?.columnsStore?.getColumnsConfig();
        const columns = (Array.isArray(storeColumns) && storeColumns.length > 0)
            ? storeColumns
            : (localCollections?.columns || localFallbackColumns || []);

        return buildCardDataModel({
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
    inCollections,
    inRenderers
} = {}) => {
    const localGlobalStore = inGlobalStore || {};
    const localRenderersStore = inRenderersStore || {};
    const localCollections = inCollections || {};
    const localRenderers = inRenderers || {};

    const fallbackData = localGlobalStore?.dataStore?.getOriginalData?.() || [];
    const fallbackColumns = localGlobalStore?.columnsStore?.getOriginalColumnsConfig?.() || localGlobalStore?.columnsConfig || [];

    const dataModels = {};

    for (const [rendererKey, rendererStoreObj] of Object.entries(localRenderersStore)) {
        if (rendererKey in modelBuildersMap) {
            const rendererStore = rendererStoreObj?.store;
            const rendererConfig = localRenderers[rendererKey];

            dataModels[rendererKey] = modelBuildersMap[rendererKey]({
                inStore: rendererStore,
                inConfig: rendererConfig,
                inFallbackData: fallbackData,
                inFallbackColumns: fallbackColumns,
                inCollections: localCollections
            });
        }
    }

    return dataModels;
};

export {
    buildDataModels
};

export default buildDataModels;
