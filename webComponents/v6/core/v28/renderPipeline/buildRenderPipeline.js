import createSearchTask from "./tasks/searchTask.js";
import { createTableTask } from "./tasks/tableTask/index.js";
import { createFormTask } from "./tasks/formTask.js";

const taskFactoryMap = {
    search: ({ inShowSearch, inDomTreeSpecs }) => {
        const localShowSearch = inShowSearch;
        const localDomTreeSpecs = inDomTreeSpecs;

        return createSearchTask({
            inShowSearch: localShowSearch,
            domTreeJsonFiles: localDomTreeSpecs
        });
    },

    table: ({ inColumns, inData, inFooterConfig, inDataModel }) => {
        const localColumns = inColumns;
        const localData = inData;
        const localFooterConfig = inFooterConfig;
        const localDataModel = inDataModel;

        return createTableTask({
            inColumns: localColumns,
            inData: localData,
            inFooterConfig: localFooterConfig,
            inDataModel: localDataModel
        });
    },

    form: ({ inColumns, inData, inDataModel }) => {
        const localColumns = inColumns;
        const localData = inData;
        const localDataModel = inDataModel;

        return createFormTask({
            inColumns: localColumns,
            inData: localData,
            inDataModel: localDataModel
        });
    }
};

/**
 * Builds dynamic array of render component pipeline task functions
 */
const buildRenderPipeline = ({
    inShowSearch = true,
    inShowTable = true,
    inCustomTasks = [],
    domTreeJsonFiles,
    inStore,
    inDataModels,
    inRenderers
} = {}) => {
    const localShowSearch = inShowSearch !== false;
    const localShowTable = inShowTable !== false;
    const localCustomTasks = inCustomTasks;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localStore = inStore;
    const localDataModels = inDataModels || localStore?.dataModels;
    const localRenderers = inRenderers || {};

    const data = localStore?.store?.dataStore?.getOriginalData();
    const fallbackColumns = localStore?.store?.columnsConfig;

    const activeRendererKeys = Object.keys(localRenderers).length > 0
        ? Object.keys(localRenderers)
        : [
            ...(localShowSearch ? ["search"] : []),
            ...(localShowTable ? ["table"] : [])
        ];

    const pipeline = activeRendererKeys
        .filter((key) => key in taskFactoryMap)
        .map((key) => {
            const columns = localStore?.renderersStore?.[key]?.store?.columnsStore?.getColumnsConfig() || fallbackColumns;
            const rendererConfig = localRenderers?.[key];
            const dataModel = localDataModels?.[key];

            return taskFactoryMap[key]({
                inColumns: columns,
                inData: data,
                inFooterConfig: rendererConfig?.footer,
                inDataModel: dataModel,
                inShowSearch: localShowSearch,
                inDomTreeSpecs: localDomTreeSpecs
            });
        });

    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export {
    buildRenderPipeline
};

export default buildRenderPipeline;
