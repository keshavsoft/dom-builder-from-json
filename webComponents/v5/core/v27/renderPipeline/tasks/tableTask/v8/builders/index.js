import { buildHeaderCells } from "./headerBuilder.js";
import { buildDataRows } from "./rowBuilder.js";
import { buildFooterRows } from "./footer/index.js";

const builderMap = {
    headerCells: buildHeaderCells,
    dataRows: buildDataRows,
    footerRows: buildFooterRows
};

export {
    builderMap,
    buildHeaderCells,
    buildDataRows,
    buildFooterRows
};

export default builderMap;
