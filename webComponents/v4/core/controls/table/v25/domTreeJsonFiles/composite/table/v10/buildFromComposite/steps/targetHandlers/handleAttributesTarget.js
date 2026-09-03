export const handleAttributesTarget = ({ inTargetNode, inValue }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;
    console.log("inTargetNode, inValue : ", inTargetNode, inValue);

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
        // Robust fallback: Treat string value as setting the 'class' attribute
        localTargetNode.attributes.class = localValue;
    }
};

export default handleAttributesTarget;
