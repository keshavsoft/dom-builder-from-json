import buildSpecFromElement from "../buildSpecFromElement.js";

export const extractChildrenAndText = ({ inElement }) => {
    const localElement = inElement;

    const childElements = Array.from(localElement.childNodes).filter(node => {
        if (node.nodeType === 1) return true;
        if (node.nodeType === 3 && node.nodeValue.trim().length > 0) return true;
        return false;
    });

    if (childElements.length === 0) {
        return { children: null, textContent: null };
    }

    const hasOnlyText = childElements.length === 1 && childElements[0].nodeType === 3;
    if (hasOnlyText) {
        return { children: null, textContent: childElements[0].nodeValue.trim() };
    }

    const children = childElements.map(child => buildSpecFromElement({ inElement: child })).filter(Boolean);
    return { children: children.length > 0 ? children : null, textContent: null };
};

export default extractChildrenAndText;
