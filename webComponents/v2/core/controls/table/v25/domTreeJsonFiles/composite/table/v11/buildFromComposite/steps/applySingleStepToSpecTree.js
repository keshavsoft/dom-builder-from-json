import findTargetNodeByPathParts from "../traversal/findTargetNodeByPathParts.js";
import targetHandlerMap from "./targetHandlers/index.js";

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
            const handler = targetHandlerMap[localTargetProp];
            if (typeof handler === "function") {
                handler({
                    inTargetNode: targetNode,
                    inValue: localValue,
                    inTemplates: localTemplates
                });
            } else {
                console.warn(`[applySingleStepToSpecTree] Unsupported target property: "${localTargetProp}"`);
            }
        }

        return localSpecTree;
    }

    return localSpecTree;
};

export default applySingleStepToSpecTree;
