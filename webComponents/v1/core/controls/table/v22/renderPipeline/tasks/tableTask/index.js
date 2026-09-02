import buildConfiguredTableSpec from "./buildConfiguredTableSpec.js";
import buildConfiguredTableSpecInput from "./buildConfiguredTableSpecInput.js";

/**
 * Render Task Transformer: Creates and appends the <table> DOM element skeleton during rendering
 */
export const createTableTask = ({
    inShowTable = true,
    domTreeJsonFiles,
    inStore,
    inRendererConfig
} = {}) => {
    const localShowTable = inShowTable !== false;
    const localDomTreeSpecs = domTreeJsonFiles;
    const localStore = inStore;
    const localRendererConfig = inRendererConfig;

    return () => {
        if (!localShowTable) {
            return null;
        }

        const tableSpecInput = buildConfiguredTableSpecInput({
            inDomTreeSpecs: localDomTreeSpecs,
            inStore: localStore,
            inRendererConfig: localRendererConfig
        });
        // console.log("tableSpecInput : ", tableSpecInput);

        return buildConfiguredTableSpec(tableSpecInput);
    };
};

export default createTableTask;
