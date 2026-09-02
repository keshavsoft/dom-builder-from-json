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

    // 1. Build Root Global Store (Single Source of Truth: originalData & originalColumnsConfig)
    const globalStore = buildGlobalStore({
        inData: localData,
        inColumnsConfig: localColumnsConfig
    });

    // 2. Build Renderer-Scoped Stores (table.store.dataStore & table.store.columnsStore)
    const renderersStore = buildRenderersStore({
        inGlobalStore: globalStore,
        inRenderers: localRenderers,
        inColumnsConfig: localColumnsConfig
    });

    // 3. Build Component Render Pipeline
    const renderPipeline = buildPipeline({
        domTreeJsonFiles: localDomTreeSpecs,
        inVisibility: localVisibility,
        inPipeline: localPipeline,
        inStore: {
            store: globalStore,
            renderersStore
        },
        inRenderers: localRenderers
    });

    return {
        renderPipeline,
        store: globalStore,
        renderersStore
    };
};

export default buildStory;
