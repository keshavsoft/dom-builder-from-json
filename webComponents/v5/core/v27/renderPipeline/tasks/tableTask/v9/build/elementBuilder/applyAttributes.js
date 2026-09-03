export const applyAttributes = ({ inElement, inAttributes }) => {
    const localElement = inElement;
    const localAttributes = inAttributes;
    if (localAttributes && typeof localAttributes === "object") {
        localElement.attributes = { ...(localElement.attributes || {}), ...localAttributes };
    }
    return localElement;
};

export default applyAttributes;
