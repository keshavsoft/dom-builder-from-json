import getRootTheme from "./root/index.js";
import getSearchTheme from "./search/index.js";
import getTableTheme from "./table/index.js";
import getTrTheme from "./tr/index.js";
import getThTheme from "./th/index.js";
import getTdTheme from "./td/index.js";

export const getThemeSpecs = ({ inTheme = "light" } = {}) => {
    const localTheme = inTheme;

    return {
        root: getRootTheme({ inTheme: localTheme }),
        search: getSearchTheme({ inTheme: localTheme }),
        table: getTableTheme({ inTheme: localTheme }),
        tr: getTrTheme({ inTheme: localTheme }),
        th: getThTheme({ inTheme: localTheme }),
        td: getTdTheme({ inTheme: localTheme })
    };
};

export {
    getRootTheme,
    getSearchTheme,
    getTableTheme,
    getTrTheme,
    getThTheme,
    getTdTheme
};

export default getThemeSpecs;

