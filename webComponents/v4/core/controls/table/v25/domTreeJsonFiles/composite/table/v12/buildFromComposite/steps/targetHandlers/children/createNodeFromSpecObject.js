export const createNodeFromSpecObject = ({ inValue }) => {
    const localValue = inValue;

    if (typeof localValue === "object" && localValue !== null && !Array.isArray(localValue)) {
        return JSON.parse(JSON.stringify(localValue));
    }
    return null;
};

export default createNodeFromSpecObject;
