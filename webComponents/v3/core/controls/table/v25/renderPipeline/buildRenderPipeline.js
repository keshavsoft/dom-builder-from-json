import createSearchTask from "./tasks/searchTask/v2/searchTask.js";
import { createTableTask, buildTableSpecTreeFromColumnsAndData, createTableTaskV4 } from "./tasks/tableTask.js";

/**
 * Builds dynamic array of render component pipeline task functions
 */
export const buildRenderPipeline = ({
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
    const localStore = inStore;
    const localRenderers = inRenderers;

    const pipeline = [];

    // Render Task 1: Search Component Task (Creates & returns search toolbar DOM element)
    pipeline.push(createSearchTask({
        inShowSearch: localShowSearch,
        domTreeJsonFiles
    }));
    const data = localStore.store.dataStore.getOriginalData();
    const columns = localStore.renderersStore.table.store.columnsStore.getColumnsConfig();

    const fromTable = createTableTaskV4({
        inColumns: columns,
        inData: data
    });

    pipeline.push(fromTable);
    // console.log("pipeline ----: ", pipeline);
    // Render Task 2: Table Component Task (Creates & appends <table> element shell, receives inStore)
    // pipeline.push(createTableTask({
    //     inShowTable: localShowTable,
    //     inDomTreeSpecs: domTreeJsonFiles,
    //     inStore: localStore,
    //     inTableConfig: localRenderers?.table
    // }));

    // External Custom Render Task Functions (e.g. searchNewTask, paginationTask)
    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export default buildRenderPipeline;
