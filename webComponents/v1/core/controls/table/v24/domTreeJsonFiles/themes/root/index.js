import dark from "./dark.json" with { type: "json" };
import extraDark from "./extra-dark.json" with { type: "json" };
import extraLight from "./extra-light.json" with { type: "json" };
import light from "./light.json" with { type: "json" };
import medium from "./medium.json" with { type: "json" };

const themeMap = {
    dark,
    "extra-dark": extraDark,
    extraDark,
    "extra-light": extraLight,
    extraLight,
    light,
    medium
};

export const getRootTheme = ({ inTheme = "light" } = {}) => {
    const localTheme = inTheme;

    return themeMap[localTheme] || themeMap.light;
};

export {
    themeMap,
    dark,
    extraDark,
    extraLight,
    light,
    medium
};

export default getRootTheme;
