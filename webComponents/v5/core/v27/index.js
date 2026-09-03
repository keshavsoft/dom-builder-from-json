import { runRenderPipeline } from "./renderPipeline/index.js";
import buildStory from "./story/index.js";
// import domCreationFuncs from "../../domCreation/index.js";
import getActiveDomTreeSpecs from "./getActiveDomTreeSpecs.js";

console.log("5-27-");

const renderTable = (inOptions = {}) => {
    const localOptions = inOptions;

    // Resolve theme name from options
    const themeName = localOptions.theme ? localOptions.theme : "light";

    // Map theme classes from getThemeSpecs onto domTreeJsonFiles base specs
    const activeDomTreeSpecs = getActiveDomTreeSpecs({ inThemeName: themeName });

    // Step 1: Build story (pipeline & store)
    const story = buildStory({
        domTreeJsonFiles: activeDomTreeSpecs,
        ...localOptions
    });

    // Step 2: Layer 1b - Execute Render Component Pipeline
    const childrenNodes = runRenderPipeline({
        inPipeline: story.renderPipeline,
        inRenderersStore: story?.renderersStore
    });

    // const domElement = domCreationFuncs.versions[domCreationFuncs.maxVersion](childrenNodes);

    const domElement = window.ks["json-to-dom"].buildSpecElement({
        inSpec: childrenNodes
    });

    const tableContainer = document.getElementById("tableContainer");

    for (let key of domElement) {
        if (tableContainer) {
            tableContainer.appendChild(key);
        };
    };

    return domElement;
};

export {
    renderTable
};

export default renderTable;