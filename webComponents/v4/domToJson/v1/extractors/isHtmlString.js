export const isHtmlString = ({ inElement }) => {
    const localElement = inElement;
    return typeof localElement === "string" && localElement.trim().length > 0;
};

export default isHtmlString;
