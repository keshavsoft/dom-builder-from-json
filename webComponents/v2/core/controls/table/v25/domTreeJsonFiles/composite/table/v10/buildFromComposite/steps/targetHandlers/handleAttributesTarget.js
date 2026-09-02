export const handleAttributesTarget = ({ inTargetNode, inValue }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;
    console.log("inTargetNode, inValue  : ", inTargetNode, inValue);

    if (!localTargetNode || typeof localValue !== "object" || localValue === null) return;

    localTargetNode.attributes = {
        ...(localTargetNode.attributes || {}),
        ...localValue
    };
};

export default handleAttributesTarget;
