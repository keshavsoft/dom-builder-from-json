import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import defaultGodSpec from "../formGodSpec.json" with { type: "json" };

/**
 * Layer 1: Skeleton Render
 * Builds the structural DOM skeleton shell from the layout God Spec template.
 * This skeleton contains layout containers (Header, Body slot, Footer) without user controls.
 */
export const renderSkeleton = ({ inSpec }) => {
    const localSpec = inSpec || defaultGodSpec;

    // Build DOM tree skeleton
    const skeletonElement = buildSpecElement(localSpec);
    return skeletonElement;
};

export default renderSkeleton;
