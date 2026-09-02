import createSearchTask from "./tasks/searchTask.js";
import createTableTask from "./tasks/tableTask.js";

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

    // Render Task 2: Table Component Task (Creates & appends <table> element shell, receives inStore)
    pipeline.push(createTableTask({
        inShowTable: localShowTable,
        domTreeJsonFiles,
        inStore: localStore,
        inRendererConfig: localRenderers?.table
    }));

    // External Custom Render Task Functions (e.g. searchNewTask, paginationTask)
    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export default buildRenderPipeline;
