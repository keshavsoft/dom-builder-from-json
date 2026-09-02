export const handleAttributesTarget = ({ inTargetNode, inValue }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;

    if (!localTargetNode) return;

    if (!localTargetNode.attributes) {
        localTargetNode.attributes = {};
    }

    if (typeof localValue === "object" && localValue !== null) {
        Object.entries(localValue).forEach(([attrKey, attrVal]) => {
            if (attrVal === null || attrVal === undefined) {
                delete localTargetNode.attributes[attrKey];
            } else {
                localTargetNode.attributes[attrKey] = String(attrVal);
            }
        });
    } else if (typeof localValue === "string") {
        localTargetNode.attributes.class = localValue;
    }
};

export default handleAttributesTarget;
