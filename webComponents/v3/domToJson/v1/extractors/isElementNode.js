export const isElementNode = ({ inNode }) => {
    const localNode = inNode;
    return localNode && localNode.nodeType === 1;
};

export default isElementNode;
