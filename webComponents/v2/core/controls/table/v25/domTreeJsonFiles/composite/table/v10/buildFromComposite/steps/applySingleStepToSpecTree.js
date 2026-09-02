import findTargetNodeByPathParts from "../traversal/findTargetNodeByPathParts.js";

export const applySingleStepToSpecTree = ({ inSpecTree, inStepDef, inTemplates }) => {
    const localSpecTree = inSpecTree;
    const localStepDef = inStepDef;
    const localTemplates = inTemplates;

    if (!localSpecTree || !localStepDef) {
        return localSpecTree;
    }

    const { find: localFindPath, target: localTargetProp, value: localValue } = localStepDef;

    if (localFindPath && localTargetProp) {
        const pathParts = localFindPath.split(".");
        const targetNode = findTargetNodeByPathParts({
            inNode: localSpecTree,
            inPathParts: pathParts
        });

        if (targetNode) {
            if (localTargetProp === "children") {
                if (!Array.isArray(targetNode.children)) {
                    targetNode.children = [];
                }
                if (typeof localValue === "string" && localTemplates?.[localValue]) {
                    const clonedChildNode = JSON.parse(JSON.stringify(localTemplates[localValue]));
                    targetNode.children.push(clonedChildNode);
                } else if (typeof localValue === "object" && localValue !== null) {
                    const clonedChildNode = JSON.parse(JSON.stringify(localValue));
                    targetNode.children.push(clonedChildNode);
                }
            } else if (localTargetProp === "textContent") {
                targetNode.textContent = localValue;
            } else if (localTargetProp === "attributes") {
                targetNode.attributes = {
                    ...(targetNode.attributes || {}),
                    ...localValue
                };
            }
        }

        return localSpecTree;
    }

    return localSpecTree;
};

export default applySingleStepToSpecTree;
