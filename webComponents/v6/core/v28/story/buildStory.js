import buildGlobalStore from "./buildGlobalStore.js";
import buildRenderersStore from "./buildRenderersStore.js";
import buildDataModels from "./buildDataModels/index.js";
import buildPipeline from "./buildPipeline.js";
import { buildDataRows } from "../renderPipeline/tasks/tableTask/v1/builders/index.js";

const buildRows = buildDataRows;
const getBodyRows = () => [];
const getFooterRows = () => [];
const getBodyAndFooterRows = () => ({ bodyRows: [], footerRows: [] });
const buildConfiguredTableSpecInput = () => ({});

/**
 * Story Orchestrator: Combines globalStore, renderersStore, dataModels, and renderPipeline
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

    // 3. Build Pure Typed Data Models for Active Renderers
    const dataModels = buildDataModels({
        inGlobalStore: globalStore,
        inRenderersStore: renderersStore,
        inRenderers: localRenderers
    });

    // 4. Build Component Render Pipeline
    const renderPipeline = buildPipeline({
        domTreeJsonFiles: localDomTreeSpecs,
        inVisibility: localVisibility,
        inPipeline: localPipeline,
        inStore: {
            store: globalStore,
            renderersStore,
            dataModels
        },
        inDataModels: dataModels,
        inRenderers: localRenderers
    });

    return {
        store: globalStore,
        renderersStore,
        dataModels,
        renderPipeline,
        refreshTable: {
            getBodyRows,
            getFooterRows,
            getBodyAndFooterRows,
            buildConfiguredTableSpecInput,
            buildRows
        },
        renderersFromInwardConfig: localRenderers
    };
};

export {
    buildStory
};

export default buildStory;
