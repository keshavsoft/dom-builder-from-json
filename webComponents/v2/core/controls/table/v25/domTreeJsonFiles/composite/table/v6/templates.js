import specJson from "./spec.json" with { type: "json" };
import darkTheme from "./dark.json" with { type: "json" };

const applyThemeToSpec = ({ inSpecJson, inThemeMap }) => {
    const localSpecJson = inSpecJson;
    const localThemeMap = inThemeMap;

    if (!localSpecJson || typeof localSpecJson !== "object") {
        return localSpecJson;
    }

    const clonedSpec = JSON.parse(JSON.stringify(localSpecJson));

    if (localThemeMap && typeof localThemeMap === "object") {
        Object.entries(localThemeMap).forEach(([key, className]) => {
            if (clonedSpec[key] && clonedSpec[key].attributes) {
                clonedSpec[key].attributes.class = className;
            }
        });
    }

    return clonedSpec;
};

export const defaultThemedSpec = applyThemeToSpec({
    inSpecJson: specJson,
    inThemeMap: darkTheme
});

export {
    specJson,
    darkTheme,
    applyThemeToSpec
};

export default defaultThemedSpec;
