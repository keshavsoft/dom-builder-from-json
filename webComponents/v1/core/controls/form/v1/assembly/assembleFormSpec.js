import buildRowSpec from "./buildRowSpec.js";
import injectSlotContent from "./injectSlotContent.js";
import defaultGodSpec from "../formGodSpec.json" with { type: "json" };

/**
 * Assembly Layer: Assembles full God Spec JSON by combining Template Shell with dynamic Field Specs into slot="body"
 */
export const assembleFormSpec = ({ inTemplateSpec, inFields }) => {
    const localTemplateSpec = inTemplateSpec || defaultGodSpec;
    const localFields = inFields || [];

    // 1. Deep clone template shell
    const assembledSpec = JSON.parse(JSON.stringify(localTemplateSpec));

    // 2. Build row specs for each field
    const rowSpecs = localFields.map(field => buildRowSpec({ inField: field }));

    // 3. Inject row specs into slot="body"
    injectSlotContent({
        inSpecNode: assembledSpec,
        inSlotName: "body",
        inContentSpecs: rowSpecs
    });

    return assembledSpec;
};

export default assembleFormSpec;
