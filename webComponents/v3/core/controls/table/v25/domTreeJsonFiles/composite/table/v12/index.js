import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };
import stepsDefinitionList from "./steps.json" with { type: "json" };
import data from "./ui/data.json" with { type: "json" };
import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";
import buildStepsFromData from "./buildStepsFromData.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildTableSpecTreeFromData = ({ inData, inColumns }) => {
    const localData = inData;
    const localColumns = inColumns;

    const baseTreeCopy = JSON.parse(JSON.stringify(initialBaseSpecTree));
    const generatedSteps = buildStepsFromData({
        inData: localData,
        inColumns: localColumns
    });

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: specTemplatesDictionary,
        inEnableLog: false
    });
};

const finalHydratedSpecTree = applySequentialStepsToSpecTree({
    inSpecTree: initialBaseSpecTree,
    inStepsDef: stepsDefinitionList,
    inTemplates: specTemplatesDictionary,
    inEnableLog: false
});

const dynamicTreeFromData = buildTableSpecTreeFromData({ inData: data });
const tbodyNode = dynamicTreeFromData.children.find(child => child.tagName === "tbody");

console.log("\n=====================================================================");
console.log("[v12 Dynamic Step Generation Result] Rows generated from data.json:", tbodyNode?.children?.length);
console.log("=====================================================================");

export {
    startCompositeDefinition,
    specTemplatesDictionary,
    stepsDefinitionList,
    initialBaseSpecTree,
    finalHydratedSpecTree,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromData,
    buildTableSpecTreeFromData
};

export default finalHydratedSpecTree;
