import findTargetNodeByPathParts from "./traversal/findTargetNodeByPathParts.js";
import buildNodeSpecTree from "./builder/buildNodeSpecTree.js";
import applyThemeClassesToTree from "./steps/applyThemeClassesToTree.js";
import applySingleStepToSpecTree from "./steps/applySingleStepToSpecTree.js";
import applySequentialStepsToSpecTree from "./steps/applySequentialStepsToSpecTree.js";
import buildBaseSpecTreeFromComposite from "./steps/buildBaseSpecTreeFromComposite.js";

export {
    findTargetNodeByPathParts,
    buildNodeSpecTree,
    applyThemeClassesToTree,
    applySingleStepToSpecTree,
    applySequentialStepsToSpecTree,
    buildBaseSpecTreeFromComposite
};

export default buildBaseSpecTreeFromComposite;
