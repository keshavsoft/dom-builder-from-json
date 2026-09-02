import handleChildrenTarget from "./children/index.js";
import handleTextContentTarget from "./textContent/index.js";
import handleAttributesTarget from "./attributes/index.js";

const targetHandlerMap = {
    children: handleChildrenTarget,
    textContent: handleTextContentTarget,
    attributes: handleAttributesTarget
};

export {
    handleChildrenTarget,
    handleTextContentTarget,
    handleAttributesTarget,
    targetHandlerMap
};

export default targetHandlerMap;
