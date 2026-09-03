import findTargetNodeByPathParts from "./findTargetNodeByPathParts.js";
import applyThemeClassesToTree from "./applyThemeClassesToTree.js";

export const applySingleStepToSpecTree = ({ inSpecTree, inStepDef, inTemplates }) => {
    const localSpecTree = inSpecTree;
    const localStepDef = inStepDef;
    const localTemplates = inTemplates;

    if (!localSpecTree || !localStepDef) {
        return localSpecTree;
    }

    if (localStepDef.theme && typeof localStepDef.theme === "object") {
        applyThemeClassesToTree({
            inNode: localSpecTree,
            inThemeMap: localStepDef.theme
        });
        return localSpecTree;
    }

    if (!localTemplates) {
        return localSpecTree;
    }

    Object.entries(localStepDef).forEach(([pathKey, childTemplateKey]) => {
        const pathParts = pathKey.split(".");
        const targetNode = findTargetNodeByPathParts({
            inNode: localSpecTree,
            inPathParts: pathParts
        });

        if (targetNode && childTemplateKey) {
            const childTemplateNode = localTemplates[childTemplateKey];
            if (childTemplateNode) {
                if (!Array.isArray(targetNode.children)) {
                    targetNode.children = [];
                }
                const clonedChildNode = JSON.parse(JSON.stringify(childTemplateNode));
                targetNode.children.push(clonedChildNode);
            }
        }
    });

    return localSpecTree;
};

export default applySingleStepToSpecTree;
