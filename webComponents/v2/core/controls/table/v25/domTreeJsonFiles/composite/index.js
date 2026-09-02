import tableComposite from "./table.json" with { type: "json" };
import specJson from "../specs/v2/spec.json" with { type: "json" };
import buildFromComposite from "./buildFromComposite.js";

const builtTableSpec = buildFromComposite({
    inCompositeDef: tableComposite,
    inTemplates: specJson
});

console.log("[Composite] Built Table Spec JSON from SOT (table.json + spec.json):", JSON.stringify(builtTableSpec, null, 2));

export {
    tableComposite,
    specJson,
    builtTableSpec,
    buildFromComposite
};

export default builtTableSpec;
