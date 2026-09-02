import { buildRenderPipeline } from "../renderPipeline/index.js";

/**
 * Resolves and normalizes grouped table options into structured responsibility buckets
 */
export const resolveTableOptions = ({
    domTreeJsonFiles,
    inVisibility = {},
    inPipeline = {},
    renderers, data
} = {}) => {
    const localPipelineObj = typeof inPipeline === "object" && inPipeline !== null ? inPipeline : {};
    const rawRenderPipeline = localPipelineObj.inRenderPipeline || localPipelineObj.renderPipeline || inPipeline;

    const renderPipeline = Array.isArray(rawRenderPipeline) && rawRenderPipeline.length > 0
        ? rawRenderPipeline
        : buildRenderPipeline({
            domTreeJsonFiles,
            inShowSearch: inVisibility?.showSearch,
            inShowTable: inVisibility?.showTable,
            inRenderers: renderers, inData: data
        });

    return {
        renderPipeline
    };
};

export default resolveTableOptions;
