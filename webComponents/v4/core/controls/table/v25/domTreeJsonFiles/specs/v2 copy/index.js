import specJson from "./spec.json" with { type: "json" };
import darkTheme from "./dark.json" with { type: "json" };
import lightTheme from "./light.json" with { type: "json" };

const themes = {
    dark: darkTheme,
    light: lightTheme
};

/**
 * Mapper: Takes theme name (or custom theme map), maps spec.json classes, logs and returns resulting JSON
 */
export const getThemedSpecJson = ({ inThemeName = "dark", inThemeMap } = {}) => {
    const localThemeName = inThemeName;
    const localThemeMap = inThemeMap || themes[localThemeName] || darkTheme;

    if (!specJson || typeof specJson !== "object") {
        return specJson;
    }

    const clonedSpec = JSON.parse(JSON.stringify(specJson));

    if (localThemeMap && typeof localThemeMap === "object") {
        Object.entries(localThemeMap).forEach(([key, className]) => {
            if (clonedSpec[key] && clonedSpec[key].attributes) {
                clonedSpec[key].attributes.class = className;
            }
        });
    }

    console.log(`[v2] Themed Spec JSON (Theme: ${localThemeName}) :`, clonedSpec);

    return clonedSpec;
};

const defaultThemedSpec = getThemedSpecJson({ inThemeName: "dark" });
console.log("defaultThemedSpec : ", defaultThemedSpec);

export {
    specJson,
    darkTheme,
    lightTheme,
    themes,
    defaultThemedSpec
};

export default getThemedSpecJson;
