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

    table: ({ inDataModel }) => {
        const localDataModel = inDataModel;

        return createTableTask({
            inDataModel: localDataModel
        });
    },

    form: ({ inDataModel }) => {
        const localDataModel = inDataModel;

        return createFormTask({
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
    inDataModels,
    inRenderers
} = {}) => {
    const localShowSearch = inShowSearch !== false;
    const localShowTable = inShowTable !== false;
    const localCustomTasks = inCustomTasks;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localDataModels = inDataModels || {};
    const localRenderers = inRenderers || {};

    const activeRendererKeys = Object.keys(localRenderers).length > 0
        ? Object.keys(localRenderers)
        : [
            ...(localShowSearch ? ["search"] : []),
            ...(localShowTable ? ["table"] : [])
        ];

    const pipeline = activeRendererKeys
        .filter((key) => key in taskFactoryMap)
        .map((key) => {
            const dataModel = localDataModels?.[key];

            return taskFactoryMap[key]({
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
