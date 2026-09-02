export const extractTagName = ({ inElement }) => {
    const localElement = inElement;
    return localElement.tagName.toLowerCase();
};

export default extractTagName;
