import tableComposite from "./start.json" with { type: "json" };
import step1 from "./steps/1.json" with { type: "json" };
import step2 from "./steps/2.json" with { type: "json" };
import { defaultThemedSpec } from "../../../specs/v2/index.js";
import buildFromComposite, { applyStepToSpecTree } from "./buildFromComposite.js";

// Step 0: Build base composite structure
let builtTableSpec = buildFromComposite({
    inCompositeDef: tableComposite,
    inTemplates: defaultThemedSpec
});

// Step 1: Apply step 1 ({ "table.thead.tr": "th" })
builtTableSpec = applyStepToSpecTree({
    inSpecTree: builtTableSpec,
    inStepDef: step1,
    inTemplates: defaultThemedSpec
});

// Step 2: Apply step 2 ({ "table.tbody.tr": "td" })
builtTableSpec = applyStepToSpecTree({
    inSpecTree: builtTableSpec,
    inStepDef: step2,
    inTemplates: defaultThemedSpec
});

console.log("[Composite v2 Steps] Result Spec JSON:\n", JSON.stringify(builtTableSpec, null, 2));

export {
    tableComposite,
    step1,
    step2,
    builtTableSpec,
    buildFromComposite,
    applyStepToSpecTree
};

export default builtTableSpec;
