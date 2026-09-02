/**
 * User UI Layer: Hydrates initial data values into user input controls.
 * Supports both DOM node references and CSS selector strings.
 */
export const hydrateFormData = ({ inFormElement, inTarget, inData }) => {
    const localFormElement = inFormElement;
    const localTarget = inTarget;
    const localData = inData || {};

    let targetElem = null;
    if (localFormElement instanceof Node) {
        targetElem = localFormElement;
    } else if (typeof localTarget === "string") {
        targetElem = document.querySelector(localTarget);
    } else if (typeof localFormElement === "string") {
        targetElem = document.querySelector(localFormElement);
    }

    if (!targetElem) return;

    Object.entries(localData).forEach(([fieldName, val]) => {
        const inputElem = targetElem.querySelector(`[name="${fieldName}"]`);
        if (inputElem) {
            inputElem.value = val;
        }
    });
};

export default hydrateFormData;
