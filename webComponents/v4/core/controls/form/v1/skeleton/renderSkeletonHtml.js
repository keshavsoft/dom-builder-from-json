import buildSpecHtml from "../../../../../htmlCreation/v1/buildSpecHtml.js";
import defaultGodSpec from "../formGodSpec.json" with { type: "json" };

/**
 * Layer 1 (HTML Flavor): Skeleton HTML String Generator
 * Generates raw HTML String markup from the layout God Spec template.
 */
export const renderSkeletonHtml = ({ inSpec }) => {
    const localSpec = inSpec || defaultGodSpec;

    // Convert Spec Tree into raw HTML String markup
    const skeletonHtml = buildSpecHtml(localSpec);
    return skeletonHtml;
};

export default renderSkeletonHtml;
