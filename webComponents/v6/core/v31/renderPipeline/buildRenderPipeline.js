import tasks from "./tasksV4/index.js";

/**
 * Builds dynamic array of render component pipeline task functions
 * Follows in -> local parameter naming convention
 */
const buildRenderPipeline = ({
    inCustomTasks = [],
    domTreeJsonFiles,
    inDataModels,
    inRenderers,
    inTasks = tasks
} = {}) => {
    const localCustomTasks = inCustomTasks;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localDataModels = inDataModels || {};
    const localRenderers = inRenderers || {};
    const localTasks = inTasks || tasks;

    const activeRendererKeys = Object.keys(localRenderers);

    const pipeline = activeRendererKeys
        .map((key) => {
            const taskFactory = localTasks[key] || localTasks[`${key}Task`];

            if (typeof taskFactory !== "function") {
                return null;
            }

            const dataModel = localDataModels?.[key];

            return taskFactory({
                inDataModel: dataModel,
                domTreeJsonFiles: localDomTreeSpecs
            });
        })
        .filter(Boolean);

    if (Array.isArray(localCustomTasks) && localCustomTasks.length > 0) {
        pipeline.push(...localCustomTasks);
    }

    return pipeline;
};

export {
    buildRenderPipeline
};

export default buildRenderPipeline;
