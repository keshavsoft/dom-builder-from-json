import extractTagName from "./extractTagName.js";
import extractAttributes from "./extractAttributes.js";
import extractChildrenAndText from "./extractChildrenAndText.js";

export const buildSpecFromSingleElement = ({ inElement }) => {
    const localElement = inElement;

    const tagName = extractTagName({ inElement: localElement });
    const attributes = extractAttributes({ inElement: localElement });
    const { children, textContent } = extractChildrenAndText({ inElement: localElement });

    const spec = { tagName };

    if (attributes && Object.keys(attributes).length > 0) {
        spec.attributes = attributes;
    }

    if (textContent) {
        spec.textContent = textContent;
    }

    if (children && children.length > 0) {
        spec.children = children;
    }

    return spec;
};

export default buildSpecFromSingleElement;
