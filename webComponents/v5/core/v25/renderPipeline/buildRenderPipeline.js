import createSearchTask from "./tasks/searchTask/v2/searchTask.js";
import { createTableTaskV4 } from "./tasks/tableTask.js";
import { createFormTask } from "./tasks/formTask.js";

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

    const fromForm = createFormTask({
        inColumns: columns,
        inData: data
    });

    pipeline.push(fromForm);

    // External Custom Render Task Functions (e.g. searchNewTask, paginationTask)
    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export default buildRenderPipeline;
