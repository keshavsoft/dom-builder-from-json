const VOID_ELEMENTS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
]);

const escapeHtml = (str) => {
    if (typeof str !== "string") return str || "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

/**
 * HTML Generator Flavor: Converts JSON Spec Tree into HTML String Markup
 */
export const buildSpecHtml = (inSpec) => {
    const localSpec = inSpec;
    if (!localSpec) return "";

    if (Array.isArray(localSpec)) {
        return localSpec.map(item => buildSpecHtml(item)).join("\n");
    }

    if (typeof localSpec !== "object" || !localSpec.tagName) return "";

    const tagName = localSpec.tagName.toLowerCase();

    // 1. Format Attributes
    let attrString = "";
    if (localSpec.attributes && typeof localSpec.attributes === "object") {
        const attrs = Object.entries(localSpec.attributes)
            .map(([key, val]) => `${key}="${escapeHtml(String(val))}"`)
            .join(" ");
        if (attrs) {
            attrString = " " + attrs;
        }
    }

    // 2. Void / Self-closing Elements (e.g. <input />, <img>)
    if (VOID_ELEMENTS.has(tagName)) {
        return `<${tagName}${attrString} />`;
    }

    // 3. Inner Content (textContent & Children)
    let innerContent = "";
    if (localSpec.textContent) {
        innerContent += escapeHtml(localSpec.textContent);
    }

    if (Array.isArray(localSpec.children) && localSpec.children.length > 0) {
        const childrenHtml = localSpec.children
            .map(child => buildSpecHtml(child))
            .filter(Boolean)
            .join("\n");
        if (childrenHtml) {
            innerContent += (innerContent ? "\n" : "") + childrenHtml;
        }
    }

    // 4. Return Container HTML Element String
    return `<${tagName}${attrString}>${innerContent}</${tagName}>`;
};

export default buildSpecHtml;
