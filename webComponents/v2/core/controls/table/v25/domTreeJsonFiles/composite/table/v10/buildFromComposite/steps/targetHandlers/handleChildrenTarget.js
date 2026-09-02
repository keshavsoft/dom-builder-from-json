export const handleChildrenTarget = ({ inTargetNode, inValue, inTemplates }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;
    const localTemplates = inTemplates;

    if (!localTargetNode) return;

    if (!Array.isArray(localTargetNode.children)) {
        localTargetNode.children = [];
    }

    if (typeof localValue === "string" && localTemplates?.[localValue]) {
        const clonedChildNode = JSON.parse(JSON.stringify(localTemplates[localValue]));
        localTargetNode.children.push(clonedChildNode);
    } else if (typeof localValue === "object" && localValue !== null) {
        const clonedChildNode = JSON.parse(JSON.stringify(localValue));
        localTargetNode.children.push(clonedChildNode);
    }
};

export default handleChildrenTarget;
