export const buildNodeSpecTree = ({ inKey, inStructure, inTemplates }) => {
    const localKey = inKey;
    const localStructure = inStructure;
    const localTemplates = inTemplates;

    const templateNode = localTemplates[localKey];
    if (!templateNode) {
        return null;
    }

    const clonedNodeSpec = JSON.parse(JSON.stringify(templateNode));
    if (!clonedNodeSpec.children) {
        clonedNodeSpec.children = [];
    }

    if (localStructure && typeof localStructure === "object") {
        Object.entries(localStructure).forEach(([childKey, childStructure]) => {
            const childSpecNode = buildNodeSpecTree({
                inKey: childKey,
                inStructure: childStructure,
                inTemplates: localTemplates
            });

            if (childSpecNode) {
                clonedNodeSpec.children.push(childSpecNode);
            }
        });
    } else if (typeof localStructure === "string" && localStructure.trim() !== "") {
        const childTemplateKey = localStructure;
        const childTemplateNode = localTemplates[childTemplateKey];
        if (childTemplateNode) {
            const clonedChildTemplateNode = JSON.parse(JSON.stringify(childTemplateNode));
            clonedNodeSpec.children.push(clonedChildTemplateNode);
        }
    }

    return clonedNodeSpec;
};

export default buildNodeSpecTree;
