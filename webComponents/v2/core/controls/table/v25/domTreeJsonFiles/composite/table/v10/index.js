import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };
import stepsDefinitionList from "./steps.json" with { type: "json" };
import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const finalHydratedSpecTree = applySequentialStepsToSpecTree({
    inSpecTree: initialBaseSpecTree,
    inStepsDef: stepsDefinitionList,
    inTemplates: specTemplatesDictionary,
    inEnableLog: false
});

console.log("\n=====================================================================");
console.log("[v9 Step Processing Result] Final Children Tree:");
console.log("=====================================================================");
console.log(JSON.stringify(finalHydratedSpecTree, null, 2));

export {
    startCompositeDefinition,
    specTemplatesDictionary,
    stepsDefinitionList,
    initialBaseSpecTree,
    finalHydratedSpecTree,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree
};

export default finalHydratedSpecTree;
