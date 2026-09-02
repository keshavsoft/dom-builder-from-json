import handleChildrenTarget from "./handleChildrenTarget.js";
import handleTextContentTarget from "./handleTextContentTarget.js";
import handleAttributesTarget from "./handleAttributesTarget.js";

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
