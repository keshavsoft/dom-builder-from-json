import getThemeSpecs from "./domTreeJsonFiles/themes/index.js";

const startFunc = ({ inSpec, inThemeName, inThemeSpec, inThemeSpecKey } = {}) => {
    const localSpec = inSpec;

    let localThemeSpec = inThemeSpec;
    if (!localThemeSpec && inThemeName) {
        const themeSpecs = getThemeSpecs({ inTheme: inThemeName });
        localThemeSpec = inThemeSpecKey ? themeSpecs[inThemeSpecKey] : themeSpecs;
    }

    if (!localSpec || typeof localSpec !== "object") {
        return localSpec;
    }

    const clonedSpec = JSON.parse(JSON.stringify(localSpec));

    if (!localThemeSpec || typeof localThemeSpec !== "object") {
        return clonedSpec;
    }

    const mergeNodeClasses = (baseNode, themeNode) => {
        if (!baseNode || !themeNode) return;

        if (themeNode.attributes && themeNode.attributes.class !== undefined) {
            baseNode.attributes = baseNode.attributes || {};
            baseNode.attributes.class = themeNode.attributes.class;
        }

        if (Array.isArray(baseNode.children) && Array.isArray(themeNode.children)) {
            const minLength = Math.min(baseNode.children.length, themeNode.children.length);
            for (let i = 0; i < minLength; i++) {
                mergeNodeClasses(baseNode.children[i], themeNode.children[i]);
            }
        }
    };

    mergeNodeClasses(clonedSpec, localThemeSpec);

    return clonedSpec;
};

export default startFunc;