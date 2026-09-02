import data from "./data.json" with { type: "json" };
import { buildTableSpecTreeFromData } from "../index.js";
import domCreationFuncs from "../domCreation/index.js";

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    const columnsToDisplay = [
        "date",
        "vouchernumber",
        "allinventoryentries.stockitemname",
        "allinventoryentries.rate",
        "allinventoryentries.amount",
        "allinventoryentries.actualqty"
    ];

    const finalHydratedSpecTree = buildTableSpecTreeFromData({
        inData: data,
        inColumns: columnsToDisplay
    });

    console.log("Dynamic finalHydratedSpecTree from data.json : ", finalHydratedSpecTree);

    const buildSpecElement = domCreationFuncs.versions[domCreationFuncs.maxVersion];
    const tableDomElement = buildSpecElement(finalHydratedSpecTree);

    console.log("Rendered Table DOM Element : ", tableDomElement);

    if (tableDomElement) {
        tableContainer.replaceChildren(tableDomElement);
    }
}