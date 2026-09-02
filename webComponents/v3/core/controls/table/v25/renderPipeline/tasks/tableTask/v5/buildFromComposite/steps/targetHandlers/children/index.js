import resolveSingleChildNode from "./resolveSingleChildNode.js";

export const handleChildrenTarget = ({ inTargetNode, inValue, inTemplates }) => {
    const localTargetNode = inTargetNode;
    const localValue = inValue;
    const localTemplates = inTemplates;

    if (!localTargetNode || !localValue) return;

    if (!Array.isArray(localTargetNode.children)) {
        localTargetNode.children = [];
    }

    const itemsToProcess = Array.isArray(localValue) ? localValue : [localValue];

    itemsToProcess.forEach((singleItem) => {
        const nodeToInsert = resolveSingleChildNode({
            inSingleValue: singleItem,
            inTemplates: localTemplates
        });

        if (nodeToInsert) {
            localTargetNode.children.push(nodeToInsert);
        }
    });
};

export default handleChildrenTarget;
