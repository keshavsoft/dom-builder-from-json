export const isElementArray = ({ inElement }) => {
    const localElement = inElement;
    const isNodeList = typeof NodeList !== "undefined" && localElement instanceof NodeList;
    const isHtmlCollection = typeof HTMLCollection !== "undefined" && localElement instanceof HTMLCollection;
    return Array.isArray(localElement) || isNodeList || isHtmlCollection;
};

export default isElementArray;
