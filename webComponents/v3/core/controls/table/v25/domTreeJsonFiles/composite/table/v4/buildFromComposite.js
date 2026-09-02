/**
 * Helper: Traverses a spec tree along a dot-path (e.g. "table.thead.tr") to find the matching target spec node
 */
const findTargetNode = ({ inNode, inParts }) => {
    const localNode = inNode;
    const localParts = inParts;

    if (!localNode || !localParts || localParts.length === 0) {
        return null;
    }

    const currentPart = localParts[0];
    const isTagMatch = localNode.tagName && localNode.tagName.toLowerCase() === currentPart.toLowerCase();

    if (!isTagMatch) {
        return null;
    }

    if (localParts.length === 1) {
        return localNode;
    }

    const remainingParts = localParts.slice(1);
    if (Array.isArray(localNode.children)) {
        for (const childNode of localNode.children) {
            const foundNode = findTargetNode({
                inNode: childNode,
                inParts: remainingParts
            });
            if (foundNode) {
                return foundNode;
            }
        }
    }

    return null;
};

/**
 * Recursive Helper: Builds a single spec node and its nested composite children
 */
const buildNodeSpec = ({ inKey, inStructure, inTemplates }) => {
    const localKey = inKey;
    const localStructure = inStructure;
    const localTemplates = inTemplates;

    const templateNode = localTemplates[localKey];
    if (!templateNode) {
        return null;
    }

    const clonedNode = JSON.parse(JSON.stringify(templateNode));
    if (!clonedNode.children) {
        clonedNode.children = [];
    }

    if (localStructure && typeof localStructure === "object") {
        Object.entries(localStructure).forEach(([childKey, childStruct]) => {
            const childSpec = buildNodeSpec({
                inKey: childKey,
                inStructure: childStruct,
                inTemplates: localTemplates
            });

            if (childSpec) {
                clonedNode.children.push(childSpec);
            }
        });
    } else if (typeof localStructure === "string" && localStructure.trim() !== "") {
        const childTemplateKey = localStructure;
        const childTemplate = localTemplates[childTemplateKey];
        if (childTemplate) {
            const clonedChildNode = JSON.parse(JSON.stringify(childTemplate));
            clonedNode.children.push(clonedChildNode);
        }
    }

    return clonedNode;
};

/**
 * Helper: Applies a single step transformation definition (e.g. { "table.thead.tr": "th" }) onto the spec tree
 */
export const applyStepToSpecTree = ({ inSpecTree, inStepDef, inTemplates }) => {
    const localSpecTree = inSpecTree;
    const localStepDef = inStepDef;
    const localTemplates = inTemplates;

    if (!localSpecTree || !localStepDef || !localTemplates) {
        return localSpecTree;
    }

    Object.entries(localStepDef).forEach(([pathKey, childTemplateKey]) => {
        const parts = pathKey.split(".");
        const targetNode = findTargetNode({
            inNode: localSpecTree,
            inParts: parts
        });

        if (targetNode && childTemplateKey) {
            const childTemplate = localTemplates[childTemplateKey];
            if (childTemplate) {
                if (!Array.isArray(targetNode.children)) {
                    targetNode.children = [];
                }
                const clonedChild = JSON.parse(JSON.stringify(childTemplate));
                targetNode.children.push(clonedChild);
            }
        }
    });

    return localSpecTree;
};

/**
 * Helper: Applies an array (or single object) of step transformations sequentially onto the spec tree,
 * logging each step's transformation and resulting spec tree state.
 */
export const applyStepsToSpecTree = ({ inSpecTree, inStepsDef, inTemplates, inEnableLog = true }) => {
    const localSpecTree = inSpecTree;
    const localStepsDef = inStepsDef;
    const localTemplates = inTemplates;
    const localEnableLog = inEnableLog;

    if (!localSpecTree || !localStepsDef || !localTemplates) {
        return localSpecTree;
    }

    const stepsArray = Array.isArray(localStepsDef) ? localStepsDef : [localStepsDef];

    return stepsArray.reduce((currentSpecTree, stepDef, index) => {
        const stepNumber = index + 1;
        if (localEnableLog) {
            console.log(`\n--- [Step ${stepNumber}] Transformation: ${JSON.stringify(stepDef)} ---`);
        }

        const nextSpecTree = applyStepToSpecTree({
            inSpecTree: currentSpecTree,
            inStepDef: stepDef,
            inTemplates: localTemplates
        });

        if (localEnableLog) {
            console.log(`[Step ${stepNumber} Output Children] :`, JSON.stringify(nextSpecTree.children, null, 2));
        }

        return nextSpecTree;
    }, localSpecTree);
};

/**
 * Main Builder: Hydrates a composite structure SOT with element spec templates
 */
export const buildFromComposite = ({ inCompositeDef, inTemplates }) => {
    const localCompositeDef = inCompositeDef;
    const localTemplates = inTemplates;

    if (!localCompositeDef || !localTemplates) {
        return null;
    }

    const topEntries = Object.entries(localCompositeDef);
    if (topEntries.length === 0) return null;

    const [topKey, topStruct] = topEntries[0];
    return buildNodeSpec({
        inKey: topKey,
        inStructure: topStruct,
        inTemplates: localTemplates
    });
};

export default buildFromComposite;
