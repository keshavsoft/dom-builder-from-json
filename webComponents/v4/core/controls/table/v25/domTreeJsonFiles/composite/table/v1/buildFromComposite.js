/**
 * Recursive Helper: Builds a single spec node and its nested composite children
 */
const buildNodeSpec = ({ inKey, inStructure, inTemplates }) => {
    const localKey = inKey;
    const localStructure = inStructure;
    const localTemplates = inTemplates;

    const templateNode = localTemplates[localKey];
    if (!templateNode) {
        return null;
    }

    const clonedNode = JSON.parse(JSON.stringify(templateNode));
    if (!clonedNode.children) {
        clonedNode.children = [];
    }

    if (localStructure && typeof localStructure === "object") {
        Object.entries(localStructure).forEach(([childKey, childStruct]) => {
            const childSpec = buildNodeSpec({
                inKey: childKey,
                inStructure: childStruct,
                inTemplates: localTemplates
            });

            if (childSpec) {
                clonedNode.children.push(childSpec);
            }
        });
    } else if (typeof localStructure === "string") {
        const childTemplateKey = localStructure;
        const childTemplate = localTemplates[childTemplateKey];
        if (childTemplate) {
            const clonedChildNode = JSON.parse(JSON.stringify(childTemplate));
            clonedNode.children.push(clonedChildNode);
        }
    }

    return clonedNode;
};

/**
 * Main Builder: Hydrates a composite structure SOT with element spec templates
 */
export const buildFromComposite = ({ inCompositeDef, inTemplates }) => {
    const localCompositeDef = inCompositeDef;
    const localTemplates = inTemplates;
    // console.log("--------", localCompositeDef, localTemplates);

    if (!localCompositeDef || !localTemplates) {
        return null;
    }

    const topEntries = Object.entries(localCompositeDef);
    if (topEntries.length === 0) return null;

    const [topKey, topStruct] = topEntries[0];
    return buildNodeSpec({
        inKey: topKey,
        inStructure: topStruct,
        inTemplates: localTemplates
    });
};

export default buildFromComposite;
