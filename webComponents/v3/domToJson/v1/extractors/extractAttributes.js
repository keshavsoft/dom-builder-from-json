export const extractAttributes = ({ inElement }) => {
    const localElement = inElement;
    if (!localElement.attributes || localElement.attributes.length === 0) {
        return null;
    }

    const attributes = {};
    Array.from(localElement.attributes).forEach(attr => {
        attributes[attr.name] = attr.value;
    });

    return attributes;
};

export default extractAttributes;
