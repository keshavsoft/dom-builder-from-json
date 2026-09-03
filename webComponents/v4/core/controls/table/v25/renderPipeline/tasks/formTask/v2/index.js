import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../../../../specs/v1/spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import columnsData from "./ui/columns.json" with { type: "json" };
import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";
import buildStepsFromDefinition from "./buildStepsFromDefinition.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildFormSpecTreeFromColumns = ({ inColumns }) => {
    const localColumns = inColumns;

    const baseTreeCopy = JSON.parse(JSON.stringify(initialBaseSpecTree));
    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns
    });

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: specTemplatesDictionary,
        inEnableLog: false
    });
};

const finalHydratedSpecTree = buildFormSpecTreeFromColumns({
    inColumns: columnsData
});

const formBodyNode = finalHydratedSpecTree.children?.find(child => child.tagName === "div");

console.log("\n=====================================================================");
console.log("[Form Step Generation] Fields generated:", formBodyNode?.children?.length);
console.log("=====================================================================");

export {
    startCompositeDefinition,
    specTemplatesDictionary,
    stepsDefinition,
    initialBaseSpecTree,
    finalHydratedSpecTree,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromDefinition,
    buildFormSpecTreeFromColumns
};

export default finalHydratedSpecTree;
