import { buildHeaderCells } from "./headerBuilder.js";
import { buildDataRows } from "./rowBuilder.js";

const builderMap = {
    headerCells: buildHeaderCells,
    dataRows: buildDataRows
};

export {
    builderMap,
    buildHeaderCells,
    buildDataRows
};

export default builderMap;
