import domElementBuilder from "./index.js";

export const buildSpecElement = (inSpec) => {
    if (!inSpec) return null;

    if (inSpec instanceof Node) return inSpec;

    if (Array.isArray(inSpec)) {
        return inSpec.map(item => buildSpecElement(item)).flat().filter(Boolean);
    }

    if (typeof inSpec !== "object") return null;

    const childrenNodes = Array.isArray(inSpec.children)
        ? inSpec.children.map(child => buildSpecElement(child)).flat().filter(Boolean)
        : [];

    return domElementBuilder({
        inSpec: {
            ...inSpec,
            children: childrenNodes
        }
    });
};

export default buildSpecElement;