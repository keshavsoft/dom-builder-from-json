import startCompositeDefinition from "./start.json" with { type: "json" };
import stepsDefinitionList from "./steps.json" with { type: "json" };
import { defaultThemedSpec } from "../../../specs/v2/index.js";
import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: defaultThemedSpec
});

const finalHydratedSpecTree = applySequentialStepsToSpecTree({
    inSpecTree: initialBaseSpecTree,
    inStepsDef: stepsDefinitionList,
    inTemplates: defaultThemedSpec,
    inEnableLog: true
});

console.log("\n=====================================================================");
console.log("[v5 Orchestration Result] Final Children Tree:");
console.log("=====================================================================");
console.log(JSON.stringify(finalHydratedSpecTree.children, null, 2));

export {
    startCompositeDefinition,
    stepsDefinitionList,
    initialBaseSpecTree,
    finalHydratedSpecTree,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree
};

export default finalHydratedSpecTree;
