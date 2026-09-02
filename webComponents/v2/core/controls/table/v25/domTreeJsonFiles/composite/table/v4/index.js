import startComposite from "./start.json" with { type: "json" };
import stepsDef from "./steps.json" with { type: "json" };
import { defaultThemedSpec } from "../../../specs/v2/index.js";
import buildFromComposite, { applyStepsToSpecTree } from "./buildFromComposite.js";

// Step 0: Build base composite structure from start.json
let builtTableSpec = buildFromComposite({
    inCompositeDef: startComposite,
    inTemplates: defaultThemedSpec
});

// Steps 1..N: Sequentially pipe builtTableSpec through array of steps in steps.json
builtTableSpec = applyStepsToSpecTree({
    inSpecTree: builtTableSpec,
    inStepsDef: stepsDef,
    inTemplates: defaultThemedSpec
});

console.log("[Composite v3 Array Steps] Result Spec JSON:\n", JSON.stringify(builtTableSpec.children, null, 2));

export {
    startComposite,
    stepsDef,
    builtTableSpec,
    buildFromComposite,
    applyStepsToSpecTree
};

export default builtTableSpec;
