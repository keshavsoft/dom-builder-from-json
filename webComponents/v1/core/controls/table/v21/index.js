import { runRenderPipeline } from "./renderPipeline/index.js";
import resolveTableOptions from "./options/resolveTableOptions.js";
import domCreationFuncs from "../../../../domCreation/index.js";
import domTreeJsonFiles from "./domTreeJsonFiles/index.js";
import applyThemeToSpec from "./applyThemeToSpec.js";

console.log("20");

export const renderTable = (inOptions = {}) => {
    const localOptions = inOptions;

    // Resolve theme name from options
    let themeName = localOptions.theme ? localOptions.theme : "light";
    // Get theme specs for resolved theme

    // Map theme classes from getThemeSpecs onto domTreeJsonFiles base specs
    const activeDomTreeSpecs = {
        root: applyThemeToSpec({ inSpec: domTreeJsonFiles.root, inThemeName: themeName, inThemeSpecKey: "root" }),
        searchSpec: applyThemeToSpec({ inSpec: domTreeJsonFiles.searchSpec, inThemeName: themeName, inThemeSpecKey: "search" }),
        tableSpec: applyThemeToSpec({ inSpec: domTreeJsonFiles.tableSpec, inThemeName: themeName, inThemeSpecKey: "table" }),
        trSpec: applyThemeToSpec({ inSpec: domTreeJsonFiles.trSpec, inThemeName: themeName, inThemeSpecKey: "tr" }),
        thSpec: applyThemeToSpec({ inSpec: domTreeJsonFiles.thSpec, inThemeName: themeName, inThemeSpecKey: "th" }),
        tdSpec: applyThemeToSpec({ inSpec: domTreeJsonFiles.tdSpec, inThemeName: themeName, inThemeSpecKey: "td" })
    };

    // Step 1: Resolve & normalize configuration options
    const options = resolveTableOptions({
        domTreeJsonFiles: activeDomTreeSpecs,
        ...localOptions
    });

    // Step 2: Layer 1b - Execute Render Component Pipeline
    const childrenNodes = runRenderPipeline({
        inPipeline: options.renderPipeline
    });

    const localRootSpec = activeDomTreeSpecs.root;

    localRootSpec.children.push(...childrenNodes);

    const domElement = domCreationFuncs.versions[domCreationFuncs.maxVersion](localRootSpec);

    return domElement;
};

export default renderTable;