import isInvalidElement from "./extractors/isInvalidElement.js";
import isTextNode from "./extractors/isTextNode.js";
import isElementNode from "./extractors/isElementNode.js";
import isElementArray from "./extractors/isElementArray.js";
import isHtmlString from "./extractors/isHtmlString.js";
import parseHtmlString from "./extractors/parseHtmlString.js";
import buildSpecFromSingleElement from "./extractors/buildSpecFromSingleElement.js";

export const buildSpecFromElement = (inElement) => {
    const isNode = typeof Node !== "undefined" && inElement instanceof Node;
    const isNodeList = typeof NodeList !== "undefined" && inElement instanceof NodeList;
    const isHtmlCollection = typeof HTMLCollection !== "undefined" && inElement instanceof HTMLCollection;

    const localElement = (inElement && typeof inElement === "object" && "inElement" in inElement && !isNode && !Array.isArray(inElement) && !isNodeList && !isHtmlCollection)
        ? inElement.inElement
        : inElement;

    if (isInvalidElement({ inElement: localElement })) return null;

    if (isHtmlString({ inElement: localElement })) {
        const parsed = parseHtmlString({ inHtmlString: localElement });
        if (!parsed) return null;
        return buildSpecFromElement({ inElement: parsed });
    }

    if (isElementArray({ inElement: localElement })) {
        return Array.from(localElement)
            .map(item => buildSpecFromElement({ inElement: item }))
            .filter(Boolean);
    }

    if (isTextNode({ inNode: localElement })) {
        const text = localElement.nodeValue.trim();
        return text ? { textContent: text } : null;
    }

    if (!isElementNode({ inNode: localElement })) return null;

    return buildSpecFromSingleElement({ inElement: localElement });
};

export default buildSpecFromElement;
