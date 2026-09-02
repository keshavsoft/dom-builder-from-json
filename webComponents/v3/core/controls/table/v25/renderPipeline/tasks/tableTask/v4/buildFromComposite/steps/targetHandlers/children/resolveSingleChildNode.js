import createNodeFromSpecObject from "./createNodeFromSpecObject.js";
import createNodeFromTemplateKey from "./createNodeFromTemplateKey.js";
import createDefaultNodeFromTagString from "./createDefaultNodeFromTagString.js";

export const resolveSingleChildNode = ({ inSingleValue, inTemplates }) => {
    const localSingleValue = inSingleValue;
    const localTemplates = inTemplates;

    if (!localSingleValue) return null;

    return (
        createNodeFromSpecObject({ inValue: localSingleValue }) ||
        createNodeFromTemplateKey({ inValue: localSingleValue, inTemplates: localTemplates }) ||
        createDefaultNodeFromTagString({ inValue: localSingleValue })
    );
};

export default resolveSingleChildNode;
