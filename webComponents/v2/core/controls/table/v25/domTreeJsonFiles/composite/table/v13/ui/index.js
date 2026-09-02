import columnsData from "./columns.json" with { type: "json" };
import rowData from "./data.json" with { type: "json" };
import { buildTableSpecTreeFromColumnsAndData } from "../index.js";
import domCreationFuncs from "../domCreation/index.js";

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    const finalHydratedSpecTree = buildTableSpecTreeFromColumnsAndData({
        inColumns: columnsData,
        inData: rowData
    });

    console.log("[v13 UI] Hydrated Spec Tree from columns.json & data.json: ", finalHydratedSpecTree);

    const buildSpecElement = domCreationFuncs.versions[domCreationFuncs.maxVersion];
    const tableDomElement = buildSpecElement(finalHydratedSpecTree);

    console.log("[v13 UI] Rendered Table DOM Element: ", tableDomElement);

    if (tableDomElement) {
        tableContainer.replaceChildren(tableDomElement);
    }
}