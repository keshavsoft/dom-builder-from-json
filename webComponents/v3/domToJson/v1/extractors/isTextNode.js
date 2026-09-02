export const isTextNode = ({ inNode }) => {
    const localNode = inNode;
    return localNode && localNode.nodeType === 3;
};

export default isTextNode;
