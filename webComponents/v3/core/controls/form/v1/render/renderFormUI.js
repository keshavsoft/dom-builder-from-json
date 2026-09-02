import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import assembleFormSpec from "../assembly/assembleFormSpec.js";
import extractFormData from "../data/extractFormData.js";

/**
 * Render Layer: Assembles spec, constructs DOM tree, and attaches event listeners/hooks
 */
export const renderFormUI = ({ inSpec, inFields, inOnSubmit }) => {
    const localSpec = inSpec;
    const localFields = inFields || [];
    const localOnSubmit = inOnSubmit;

    // 1. Assemble dynamic God Spec JSON using slot="body"
    const finalSpec = assembleFormSpec({
        inTemplateSpec: localSpec,
        inFields: localFields
    });

    // 2. Build DOM Tree
    const formElement = buildSpecElement(finalSpec);

    // 3. Bind Submit Event Hook
    if (formElement && typeof localOnSubmit === "function") {
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = extractFormData({ inFormElement: formElement });
            localOnSubmit({ inFormData: formData, inEvent: event });
        });
    }

    return formElement;
};

export default renderFormUI;
