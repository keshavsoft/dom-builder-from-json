export const appendChildren = ({ inElement, inChildren }) => {
    const localElement = inElement;
    const localChildren = inChildren;
    if (Array.isArray(localChildren)) {
        localElement.children = localChildren.filter(Boolean);
    }
    return localElement;
};

export default appendChildren;
