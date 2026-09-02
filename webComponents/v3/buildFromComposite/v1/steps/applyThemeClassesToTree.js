export const applyThemeClassesToTree = ({ inNode, inThemeMap }) => {
    const localNode = inNode;
    const localThemeMap = inThemeMap;

    if (!localNode || !localThemeMap) {
        return;
    }

    const tagNameKey = localNode.tagName ? localNode.tagName.toLowerCase() : null;
    if (tagNameKey && localThemeMap[tagNameKey]) {
        if (!localNode.attributes) {
            localNode.attributes = {};
        }
        localNode.attributes.class = localThemeMap[tagNameKey];
    }

    if (Array.isArray(localNode.children)) {
        localNode.children.forEach((childNode) => {
            applyThemeClassesToTree({
                inNode: childNode,
                inThemeMap: localThemeMap
            });
        });
    }
};

export default applyThemeClassesToTree;
