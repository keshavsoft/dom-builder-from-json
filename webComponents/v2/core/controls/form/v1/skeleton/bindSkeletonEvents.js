import extractFormData from "../userUI/extractFormData.js";

/**
 * Layer 2: Skeleton Events
 * Hooks event handlers onto the structural skeleton DOM element (e.g., submit event).
 */
export const bindSkeletonEvents = ({ inFormElement, inOnSubmit }) => {
    const localFormElement = inFormElement;
    const localOnSubmit = inOnSubmit;

    if (!localFormElement || typeof localOnSubmit !== "function") return;

    localFormElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = extractFormData({ inFormElement: localFormElement });
        localOnSubmit({ inFormData: formData, inEvent: event });
    });
};

export default bindSkeletonEvents;
