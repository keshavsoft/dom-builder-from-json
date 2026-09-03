import darkTheme from "./domTreeJsonFiles/themes/dark.json" with { type: "json" };

const setByPath = ({ inObj, inPath, inValue }) => {
    const localObj = inObj;
    const localPath = inPath;
    const localValue = inValue;

    const parts = localPath.split(".");
    let current = localObj;

    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part] || typeof current[part] !== "object") {
            current[part] = {};
        }
        current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = localValue;
};

export const applyThemeToSpec = ({ inSpec, inThemeMap }) => {
    const localSpec = inSpec;
    const localThemeMap = inThemeMap || darkTheme;

    if (!localSpec || typeof localSpec !== "object") {
        return localSpec;
    }

    const clonedSpec = JSON.parse(JSON.stringify(localSpec));

    if (localThemeMap && typeof localThemeMap === "object") {
        Object.entries(localThemeMap).forEach(([pathKey, classValue]) => {
            setByPath({
                inObj: clonedSpec,
                inPath: pathKey,
                inValue: classValue
            });
        });
    }

    return clonedSpec;
};

export default applyThemeToSpec;