/**
 * Builds a nested DOM Spec node tree by hydrating a composite structure SOT with element spec templates
 */
export const buildFromComposite = ({ inCompositeDef, inTemplates }) => {
    const localCompositeDef = inCompositeDef;
    const localTemplates = inTemplates;
    console.log("ggggggggg : ", localTemplates);

    if (!localCompositeDef || !localTemplates) {
        return null;
    }

    const buildNode = ({ inKey, inStructure }) => {
        const localKey = inKey;
        const localStructure = inStructure;

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
                const childSpec = buildNode({
                    inKey: childKey,
                    inStructure: childStruct
                });

                if (childSpec) {
                    clonedNode.children.push(childSpec);
                }
            });
        }

        return clonedNode;
    };

    const topEntries = Object.entries(localCompositeDef);
    if (topEntries.length === 0) return null;

    const [topKey, topStruct] = topEntries[0];
    return buildNode({ inKey: topKey, inStructure: topStruct });
};

export default buildFromComposite;
