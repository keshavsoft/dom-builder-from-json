import tableComposite from "./table.json" with { type: "json" };
import { defaultThemedSpec } from "../../../specs/v2/index.js";
import buildFromComposite from "./buildFromComposite.js";

const builtTableSpec = buildFromComposite({
    inCompositeDef: tableComposite,
    inTemplates: defaultThemedSpec
});

console.log("[Composite] Built Table Spec JSON from SOT (table.json + spec.json):", JSON.stringify(builtTableSpec, null, 2));
