import buildGlobalStore from "./buildGlobalStore.js";
import buildRenderersStore from "./buildRenderersStore.js";
import buildCollections from "./collections/index.js";
import buildDataModels from "./buildDataModels/index.js";
import buildPipeline from "./buildPipeline.js";
/**
 * Story Orchestrator: Combines globalStore, renderersStore, collections, dataModels, and renderPipeline
 */
const buildStory = ({
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

    // 3. Build Canonical UI Collections (columns, rows, etc.)
    const collections = buildCollections({
        inGlobalStore: globalStore,
        inColumnsConfig: localColumnsConfig,
        inData: localData
    });

    // 4. Build Pure Typed Data Models for Active Renderers
    const dataModels = buildDataModels({
        inGlobalStore: globalStore,
        inRenderersStore: renderersStore,
        inCollections: collections,
        inRenderers: localRenderers
    });

    // 5. Build Component Render Pipeline
    const renderPipeline = buildPipeline({
        domTreeJsonFiles: localDomTreeSpecs,
        inVisibility: localVisibility,
        inPipeline: localPipeline,
        inCollections: collections,
        inDataModels: dataModels,
        inRenderers: localRenderers
    });

    return {
        store: globalStore,
        renderersStore,
        collections,
        dataModels,
        renderPipeline,
        renderersFromInwardConfig: localRenderers
    };
};

export {
    buildStory
};

export default buildStory;
