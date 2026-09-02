import domTreeJsonFiles from "./domTreeJsonFiles/index.js";
import applyThemeToSpec from "./applyThemeToSpec.js";

const processDomTreeSpecs = ({ inDomTreeObject, inThemeName }) => {
    const localDomTreeObject = inDomTreeObject;
    const localThemeName = inThemeName;

    if (!localDomTreeObject || typeof localDomTreeObject !== "object") {
        return localDomTreeObject;
    }

    const result = {};

    Object.entries(localDomTreeObject).forEach(([key, val]) => {
        if (!val || typeof val !== "object") {
            result[key] = val;
        } else if (val.tagName) {
            result[key] = applyThemeToSpec({
                inSpec: val,
                inThemeName: localThemeName,
                inThemeSpecKey: key
            });
        } else {
            result[key] = processDomTreeSpecs({
                inDomTreeObject: val,
                inThemeName: localThemeName
            });
        }
    });

    return result;
};

export const getActiveDomTreeSpecs = ({ inThemeName, inDomTreeJsonFiles }) => {
    const localThemeName = inThemeName || "light";
    const localDomTreeJsonFiles = inDomTreeJsonFiles || domTreeJsonFiles;
    // console.log("localDomTreeJsonFiles-------- : ", localDomTreeJsonFiles);

    const activeSpecs = processDomTreeSpecs({
        inDomTreeObject: localDomTreeJsonFiles,
        inThemeName: localThemeName
    });

    // console.log("activeSpecs (recursively processed) : ", activeSpecs);

    return activeSpecs;
};

export default getActiveDomTreeSpecs;
