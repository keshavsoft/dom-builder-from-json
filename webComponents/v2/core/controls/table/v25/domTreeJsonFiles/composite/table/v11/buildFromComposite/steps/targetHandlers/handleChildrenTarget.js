const createNodeFromSpecObject = ({ inValue }) => {
    const localValue = inValue;

    if (typeof localValue === "object" && localValue !== null && !Array.isArray(localValue)) {
        return JSON.parse(JSON.stringify(localValue));
    }
    return null;
};

const createNodeFromTemplateKey = ({ inValue, inTemplates }) => {
    const localValue = inValue;
    const localTemplates = inTemplates;

    if (typeof localValue === "string" && localTemplates?.[localValue]) {
        return JSON.parse(JSON.stringify(localTemplates[localValue]));
    }
    return null;
};

const createDefaultNodeFromTagString = ({ inValue }) => {
    const localValue = inValue;

    if (typeof localValue === "string" && localValue.trim() !== "") {
        return {
            tagName: localValue.trim(),
            attributes: {
                class: ""
            },
            children: []
        };
    }
    return null;
};

const resolveSingleChildNode = ({ inSingleValue, inTemplates }) => {
    const localSingleValue = inSingleValue;
    const localTemplates = inTemplates;

    if (!localSingleValue) return null;

    return (
        createNodeFromSpecObject({ inValue: localSingleValue }) ||
        createNodeFromTemplateKey({ inValue: localSingleValue, inTemplates: localTemplates }) ||
        createDefaultNodeFromTagString({ inValue: localSingleValue })
    );
};

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
