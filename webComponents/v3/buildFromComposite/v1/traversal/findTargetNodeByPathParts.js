export const findTargetNodeByPathParts = ({ inNode, inPathParts }) => {
    const localNode = inNode;
    const localPathParts = inPathParts;

    if (!localNode || !localPathParts || localPathParts.length === 0) {
        return null;
    }

    const currentPart = localPathParts[0];
    const isMatchingTag = localNode.tagName && localNode.tagName.toLowerCase() === currentPart.toLowerCase();

    if (!isMatchingTag) {
        return null;
    }

    if (localPathParts.length === 1) {
        return localNode;
    }

    const remainingPathParts = localPathParts.slice(1);
    if (Array.isArray(localNode.children)) {
        for (const childNode of localNode.children) {
            const foundTargetNode = findTargetNodeByPathParts({
                inNode: childNode,
                inPathParts: remainingPathParts
            });
            if (foundTargetNode) {
                return foundTargetNode;
            }
        }
    }

    return null;
};

export default findTargetNodeByPathParts;
