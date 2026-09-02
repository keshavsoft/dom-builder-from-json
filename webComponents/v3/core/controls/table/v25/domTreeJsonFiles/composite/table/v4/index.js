import startComposite from "./start.json" with { type: "json" };
import stepsDef from "./steps.json" with { type: "json" };
import { defaultThemedSpec } from "../../../specs/v2/index.js";
import buildFromComposite, { applyStepsToSpecTree } from "./buildFromComposite.js";

console.log("=====================================================================");
console.log("[Composite v4 Pipeline Story] Starting Progressive Spec Hydration");
console.log("=====================================================================");

// Step 0: Build base composite structure from start.json
let builtTableSpec = buildFromComposite({
    inCompositeDef: startComposite,
    inTemplates: defaultThemedSpec
});

console.log("\n--- [Step 0] Base Composite Structure (start.json + defaultThemedSpec) ---");
console.log("[Step 0 Output Children] :", JSON.stringify(builtTableSpec.children, null, 2));

// Steps 1..N: Sequentially pipe builtTableSpec through array of steps in steps.json with logging
builtTableSpec = applyStepsToSpecTree({
    inSpecTree: builtTableSpec,
    inStepsDef: stepsDef,
    inTemplates: defaultThemedSpec,
    inEnableLog: true
});

console.log("\n=====================================================================");
console.log("[Composite v4 Pipeline Story] Final Combined Spec Tree:");
console.log("=====================================================================");
console.log(JSON.stringify(builtTableSpec.children, null, 2));

export {
    startComposite,
    stepsDef,
    builtTableSpec,
    buildFromComposite,
    applyStepsToSpecTree
};

export default builtTableSpec;
