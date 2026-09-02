import buildGlobalStore from "./buildGlobalStore.js";
import buildRenderersStore from "./buildRenderersStore.js";
import buildPipeline from "./buildPipeline.js";

/**
 * Story Orchestrator: Combines globalStore, renderersStore, and renderPipeline
 */
export const buildStory = ({
    domTreeJsonFiles,
    inVisibility = {},
    inPipeline = {},
    columnsConfig,
    renderers,
    data
} = {}) => {
    const localDomTreeSpecs = domTreeJsonFiles;
    const localVisibility = inVisibility;
    const localPipeline = inPipeline;
    const localColumnsConfig = columnsConfig || [];
    const localData = data || [];
    const localRenderers = renderers || {};

    // 1. Build Global Store
    const globalStore = buildGlobalStore({
        inData: localData,
        inColumnsConfig: localColumnsConfig
    });

    // 2. Build Renderer-Scoped Stores
    const renderersStore = buildRenderersStore({
        inGlobalStore: globalStore,
        inRenderers: localRenderers
    });

    // 3. Build Component Render Pipeline
    const renderPipeline = buildPipeline({
        domTreeJsonFiles: localDomTreeSpecs,
        inVisibility: localVisibility,
        inPipeline: localPipeline,
        inStore: globalStore,
        inRenderers: localRenderers
    });

    return {
        renderPipeline,
        store: globalStore,
        renderersStore
    };
};

export default buildStory;
