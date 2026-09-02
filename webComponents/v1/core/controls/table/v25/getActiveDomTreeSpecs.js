import domTreeJsonFiles from "./domTreeJsonFiles/index.js";
import applyThemeToSpec from "./applyThemeToSpec.js";

export const getActiveDomTreeSpecs = ({ inThemeName, inDomTreeJsonFiles }) => {
    const localThemeName = inThemeName || "light";
    const localDomTreeJsonFiles = inDomTreeJsonFiles || domTreeJsonFiles;

    return {
        root: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.root, inThemeName: localThemeName, inThemeSpecKey: "root" }),
        searchSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.searchSpec, inThemeName: localThemeName, inThemeSpecKey: "search" }),
        tableSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.tableSpec, inThemeName: localThemeName, inThemeSpecKey: "table" }),
        trSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.trSpec, inThemeName: localThemeName, inThemeSpecKey: "tr" }),
        thSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.thSpec, inThemeName: localThemeName, inThemeSpecKey: "th" }),
        tdSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.tdSpec, inThemeName: localThemeName, inThemeSpecKey: "td" }),
        inputSpec: applyThemeToSpec({ inSpec: localDomTreeJsonFiles.inputSpec, inThemeName: localThemeName, inThemeSpecKey: "input" })
    };
};

export default getActiveDomTreeSpecs;
