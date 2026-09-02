import buildConfiguredTableSpec from "./buildConfiguredTableSpec.js";

/**
 * Render Task Transformer: Creates and appends the <table> DOM element skeleton during rendering
 */
export const createTableTask = ({
    inShowTable = true,
    domTreeJsonFiles,
    inRendererConfig,
    inData
} = {}) => {
    const localShowTable = inShowTable !== false;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localRendererConfig = inRendererConfig;
    const localData = inData;

    return () => {
        if (!localShowTable) {
            return null;
        }

        const columns = localRendererConfig?.columns || [];
        const hasFooterConfig = Boolean(localRendererConfig && ("footer" in localRendererConfig));
        const footerConfig = localRendererConfig?.footer;

        return buildConfiguredTableSpec({
            inDomTreeSpecs: localDomTreeSpecs,
            inColumns: columns,
            inData: localData,
            inHasFooterConfig: hasFooterConfig,
            inFooterConfig: footerConfig
        });
    };
};

export default createTableTask;
