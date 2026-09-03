export const parseHtmlString = ({ inHtmlString }) => {
    const localHtmlString = inHtmlString;
    if (typeof document === "undefined") {
        return null;
    }
    const template = document.createElement("template");
    template.innerHTML = localHtmlString.trim();
    const children = Array.from(template.content.childNodes).filter(node => {
        if (node.nodeType === 1) return true;
        if (node.nodeType === 3 && node.nodeValue.trim().length > 0) return true;
        return false;
    });
    return children.length === 1 ? children[0] : children;
};

export default parseHtmlString;
