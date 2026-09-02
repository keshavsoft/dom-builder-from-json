export const handleTextContentTarget = ({ inTargetNode, inValue }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;

    if (!localTargetNode) return;

    localTargetNode.textContent = localValue !== undefined && localValue !== null ? String(localValue) : "";
};

export default handleTextContentTarget;
