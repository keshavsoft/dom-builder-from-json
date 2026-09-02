import compareSpecNodes from "./comparators/compareSpecNodes.js";
import buildSpecFromElement from "../../domToJson/v1/buildSpecFromElement.js";

const isDomOrHtml = (item) => {
    if (!item) return false;
    const isNode = typeof Node !== "undefined" && item instanceof Node;
    const isHtml = typeof item === "string" && item.trim().startsWith("<");
    const isElementLike = typeof item === "object" && item.nodeType === 1;
    return isNode || isHtml || isElementLike;
};

export const compareSpecs = ({ inFromSpec, inToSpec }) => {
    const localFromSpec = isDomOrHtml(inFromSpec)
        ? buildSpecFromElement({ inElement: inFromSpec })
        : inFromSpec;

    const localToSpec = isDomOrHtml(inToSpec)
        ? buildSpecFromElement({ inElement: inToSpec })
        : inToSpec;

    const { missingInTo, extraInTo, mismatches } = compareSpecNodes({
        inFromSpec: localFromSpec,
        inToSpec: localToSpec,
        inPath: ""
    });

    const isEqual = missingInTo.length === 0 && extraInTo.length === 0 && mismatches.length === 0;

    return {
        isEqual,
        summary: {
            missingInCount: missingInTo.length,
            extraInCount: extraInTo.length,
            mismatchCount: mismatches.length
        },
        missingInTo,
        extraInTo,
        mismatches
    };
};

export default compareSpecs;
