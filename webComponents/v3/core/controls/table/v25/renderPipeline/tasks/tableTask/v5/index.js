import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import columnsData from "./ui/columns.json" with { type: "json" };
import rowData from "./ui/data.json" with { type: "json" };
import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";
import buildStepsFromDefinition from "./buildStepsFromDefinition.js";
import { buildStepsFromColumnsAndData } from "./buildStepsFromColumnsAndData.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildTableSpecTreeFromColumnsAndData = ({ inColumns, inData }) => {
    const localColumns = inColumns;
    const localData = inData;

    const baseTreeCopy = JSON.parse(JSON.stringify(initialBaseSpecTree));
    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns,
        inData: localData
    });

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: specTemplatesDictionary,
        inEnableLog: false
    });
};

const finalHydratedSpecTree = buildTableSpecTreeFromColumnsAndData({
    inColumns: columnsData,
    inData: rowData
});

const tbodyNode = finalHydratedSpecTree.children.find(child => child.tagName === "tbody");

console.log("\n=====================================================================");
console.log("[v13 Columns & Data Step Generation] Rows generated:", tbodyNode?.children?.length);
console.log("=====================================================================");

export {
    startCompositeDefinition,
    specTemplatesDictionary,
    stepsDefinition,
    initialBaseSpecTree,
    finalHydratedSpecTree,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromColumnsAndData,
    buildStepsFromDefinition,
    buildTableSpecTreeFromColumnsAndData
};

export default finalHydratedSpecTree;
