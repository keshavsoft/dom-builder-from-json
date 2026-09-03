import createSearchTask from "./tasks/searchTask.js";
import { createTableTask } from "./tasks/tableTask.js";
import { createFormTask } from "./tasks/formTask.js";

/**
 * Builds dynamic array of render component pipeline task functions
 */
const buildRenderPipeline = ({
    inShowSearch = true,
    inShowTable = true,
    inCustomTasks = [],
    domTreeJsonFiles,
    inStore,
    inRenderers
} = {}) => {
    const localShowSearch = inShowSearch !== false;
    const localShowTable = inShowTable !== false;
    const localCustomTasks = inCustomTasks;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localStore = inStore;
    const localRenderers = inRenderers || {};

    const pipeline = [];

    const hasRenderersConfig = Object.keys(localRenderers).length > 0;
    const shouldRenderSearch = hasRenderersConfig ? ("search" in localRenderers && localShowSearch) : localShowSearch;
    const shouldRenderTable = hasRenderersConfig ? ("table" in localRenderers && localShowTable) : localShowTable;
    const shouldRenderForm = "form" in localRenderers;

    // Render Task 1: Search Component Task (Creates & returns search toolbar DOM element)
    if (shouldRenderSearch) {
        pipeline.push(createSearchTask({
            inShowSearch: localShowSearch,
            domTreeJsonFiles: localDomTreeSpecs
        }));
    }

    const data = localStore?.store?.dataStore?.getOriginalData();

    if (shouldRenderTable) {
        const tableColumns = localStore?.renderersStore?.table?.store?.columnsStore?.getColumnsConfig() || localStore?.store?.columnsConfig;

        const fromTable = createTableTask({
            inColumns: tableColumns,
            inData: data
        });

        pipeline.push(fromTable);
    }

    if (shouldRenderForm) {
        const formColumns = localStore?.renderersStore?.form?.store?.columnsStore?.getColumnsConfig() || localStore?.renderersStore?.table?.store?.columnsStore?.getColumnsConfig();

        const fromForm = createFormTask({
            inColumns: formColumns,
            inData: data
        });

        pipeline.push(fromForm);
    }

    // External Custom Render Task Functions (e.g. searchNewTask, paginationTask)
    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export {
    buildRenderPipeline
};

export default buildRenderPipeline;
