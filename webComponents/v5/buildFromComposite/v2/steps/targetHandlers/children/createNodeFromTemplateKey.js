export const createNodeFromTemplateKey = ({ inValue, inTemplates }) => {
    const localValue = inValue;
    const localTemplates = inTemplates;

    if (typeof localValue === "string" && localTemplates?.[localValue]) {
        return JSON.parse(JSON.stringify(localTemplates[localValue]));
    }
    return null;
};

export default createNodeFromTemplateKey;
