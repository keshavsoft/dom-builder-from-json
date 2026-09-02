import root from "./root.json" with { type: "json" };
import searchSpec from "./searchSpec.json" with { type: "json" };
import tableSpec from "./table/tableSpec.json" with { type: "json" };
import trSpec from "./table/trSpec.json" with { type: "json" };
import thSpec from "./table/thSpec.json" with { type: "json" };
import tdSpec from "./table/tdSpec.json" with { type: "json" };
import inputSpec from "./table/inputSpec.json" with { type: "json" };

const table = {
    tableSpec,
    trSpec,
    thSpec,
    tdSpec,
    inputSpec
};

export {
    root,
    searchSpec,
    table
};

export default {
    root,
    searchSpec,
    table
};
