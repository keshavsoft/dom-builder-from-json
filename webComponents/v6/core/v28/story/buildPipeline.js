import { buildRenderPipeline } from "../renderPipeline/index.js";

/**
 * Helper: Resolves and builds component render pipeline
 */
export const buildPipeline = ({
    domTreeJsonFiles,
    inVisibility = {},
    inPipeline = {},
    inDataModels,
    inRenderers
}) => {
    const localDomTreeSpecs = domTreeJsonFiles;
    const localVisibility = inVisibility;
    const localPipelineObj = typeof inPipeline === "object" && inPipeline !== null ? inPipeline : {};
    const rawRenderPipeline = localPipelineObj.inRenderPipeline || localPipelineObj.renderPipeline || inPipeline;
    const localDataModels = inDataModels;
    const localRenderers = inRenderers;

    if (Array.isArray(rawRenderPipeline) && rawRenderPipeline.length > 0) {
        return rawRenderPipeline;
    }

    return buildRenderPipeline({
        domTreeJsonFiles: localDomTreeSpecs,
        inShowSearch: localVisibility?.showSearch,
        inShowTable: localVisibility?.showTable,
        inDataModels: localDataModels,
        inRenderers: localRenderers
    });
};

export default buildPipeline;
