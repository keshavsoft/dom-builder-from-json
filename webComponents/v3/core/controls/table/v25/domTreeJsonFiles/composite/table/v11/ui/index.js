import { finalHydratedSpecTree } from "../index.js";
import domCreationFuncs from "../domCreation/index.js";

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    console.log("finalHydratedSpecTree : ", finalHydratedSpecTree);

    const buildSpecElement = domCreationFuncs.versions[domCreationFuncs.maxVersion];
    const tableDomElement = buildSpecElement(finalHydratedSpecTree);

    console.log("Rendered Table DOM Element : ", tableDomElement);

    if (tableDomElement) {
        tableContainer.replaceChildren(tableDomElement);
    };
}