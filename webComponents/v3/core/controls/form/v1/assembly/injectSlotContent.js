/**
 * Assembly Layer: Recursively traverses a spec node tree to find slot === inSlotName and injects content specs
 */
export const injectSlotContent = ({ inSpecNode, inSlotName, inContentSpecs }) => {
    const localSpecNode = inSpecNode;
    const localSlotName = inSlotName;
    const localContentSpecs = inContentSpecs || [];

    if (!localSpecNode || typeof localSpecNode !== "object") return;

    if (localSpecNode.slot === localSlotName) {
        localSpecNode.children = localContentSpecs;
        return;
    }

    if (Array.isArray(localSpecNode.children)) {
        localSpecNode.children.forEach(child => {
            injectSlotContent({
                inSpecNode: child,
                inSlotName: localSlotName,
                inContentSpecs: localContentSpecs
            });
        });
    }
};

export default injectSlotContent;
