import domTreeJsonFiles from "./domTreeJsonFiles/index.js";
import applyThemeToSpec from "./applyThemeToSpec.js";

export const getActiveDomTreeSpecs = ({ inThemeMap, inDomTreeJsonFiles }) => {
    const localDomTreeJsonFiles = inDomTreeJsonFiles || domTreeJsonFiles?.v2 || domTreeJsonFiles;
    const localThemeMap = inThemeMap;

    const activeSpecs = applyThemeToSpec({
        inSpec: localDomTreeJsonFiles,
        inThemeMap: localThemeMap
    });

    console.log("activeSpecs (clean v2 specs + flat theme applied) : ", activeSpecs);

    return activeSpecs;
};

export default getActiveDomTreeSpecs;
