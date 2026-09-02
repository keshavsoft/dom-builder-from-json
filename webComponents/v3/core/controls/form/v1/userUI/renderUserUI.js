import buildSpecElement from "../../../../../domCreation/v2/buildSpecElement.js";
import buildUserRowSpec from "./buildUserRowSpec.js";

/**
 * Layer 3: User UI Render
 * Supports dual-flavor execution:
 *   Flavor A (In-Memory Node): inSkeletonElement passed as DOM node.
 *   Flavor B (Global Document DOM): inTarget passed as CSS selector string or document query fallback.
 */
export const renderUserUI = ({ inSkeletonElement, inTarget, inFields }) => {
    const localSkeletonElement = inSkeletonElement;
    const localTarget = inTarget;
    const localFields = inFields || [];

    // 1. Resolve Target Container:
    let targetElem = null;

    if (localSkeletonElement instanceof Node) {
        targetElem = localSkeletonElement;
    } else if (typeof localTarget === "string") {
        targetElem = document.querySelector(localTarget);
    } else if (typeof localSkeletonElement === "string") {
        targetElem = document.querySelector(localSkeletonElement);
    }

    if (!targetElem) {
        targetElem = document.querySelector('[slot="body"]') || document.body;
    }

    // 2. Locate the body slot container within the target element
    const bodySlotElem = (targetElem instanceof Node && targetElem.querySelector)
        ? (targetElem.querySelector('[slot="body"]') || targetElem.querySelector('.form-body') || targetElem)
        : targetElem;

    // 3. Build row specs for each field definition
    const rowSpecs = localFields.map(field => buildUserRowSpec({ inField: field }));

    // 4. Convert row specs to DOM nodes
    const userNodes = buildSpecElement(rowSpecs);

    // 5. Mount user control nodes into the skeleton body slot container
    if (Array.isArray(userNodes)) {
        userNodes.forEach(node => bodySlotElem.appendChild(node));
    } else if (userNodes instanceof Node) {
        bodySlotElem.appendChild(userNodes);
    }

    return targetElem;
};

export default renderUserUI;
