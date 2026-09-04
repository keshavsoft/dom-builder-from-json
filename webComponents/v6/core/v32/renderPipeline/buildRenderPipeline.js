import tasks from "./tasksV4/index.js";

/**
 * Builds dynamic array of render component pipeline task functions
 * Follows in -> local parameter naming convention
 */
const buildRenderPipeline = ({
    inCustomTasks = [],
    domTreeJsonFiles,
    inCollections,
    inDataModels,
    inRenderers,
    inTasks = tasks
} = {}) => {
    const localCustomTasks = inCustomTasks;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localCollections = inCollections || {};
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
                inCollections: localCollections,
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
