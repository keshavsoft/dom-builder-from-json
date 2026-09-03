import { buildHeaderCells } from "./headerBuilder.js";
import { buildDataRows } from "./rowBuilder.js";
import { buildFooterRows } from "./footerBuilder.js";

const builderMap = {
    tableHeaderCell: buildHeaderCells,
    tableRow: buildDataRows,
    tableFooterRow: buildFooterRows,
    // Aliases for backwards compatibility
    headerCells: buildHeaderCells,
    dataRows: buildDataRows,
    footerRows: buildFooterRows,
    tHead: buildHeaderCells,
    tBody: buildDataRows,
    tFoot: buildFooterRows
};

export {
    builderMap,
    buildHeaderCells,
    buildDataRows,
    buildFooterRows
};

export default builderMap;
