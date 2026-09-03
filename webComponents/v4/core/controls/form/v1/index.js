import renderSkeleton from "./skeleton/renderSkeleton.js";
import renderSkeletonHtml from "./skeleton/renderSkeletonHtml.js";
import bindSkeletonEvents from "./skeleton/bindSkeletonEvents.js";
import renderUserUI from "./userUI/renderUserUI.js";
import hydrateFormData from "./userUI/hydrateFormData.js";
import extractFormData from "./userUI/extractFormData.js";

/**
 * Form v7 Layered Architecture Orchestrator
 *
 * Layer 1: Skeleton Creation (`renderSkeleton` for DOM, `renderSkeletonHtml` for HTML String)
 * Layer 2: Skeleton Event Hooks (`bindSkeletonEvents`)
 * Layer 3: User UI & Data Hydration (`renderUserUI`, `hydrateFormData`)
 */
export const renderForm = ({ inSpec, inFields, inData, inOnSubmit }) => {
    const localSpec = inSpec;
    const localFields = inFields || [];
    const localData = inData;
    const localOnSubmit = inOnSubmit;

    // Layer 1: Build Layout Skeleton DOM Shell (No user controls yet)
    const skeletonElement = renderSkeleton({ inSpec: localSpec });

    // Layer 2: Hook Skeleton Event Listeners (e.g. submit hook)
    bindSkeletonEvents({
        inFormElement: skeletonElement,
        inOnSubmit: localOnSubmit
    });

    // Layer 3a: Inject & Render Dynamic User UI Controls into Skeleton body slot
    renderUserUI({
        inSkeletonElement: skeletonElement,
        inFields: localFields
    });

    // Layer 3b: Hydrate Initial Data Payload (Optional - only if inData is supplied)
    if (localData && Object.keys(localData).length > 0) {
        hydrateFormData({
            inFormElement: skeletonElement,
            inData: localData
        });
    }

    return skeletonElement;
};

// Re-export layers for fine-grained step-by-step orchestration
export {
    renderSkeleton,
    renderSkeletonHtml,
    bindSkeletonEvents,
    renderUserUI,
    hydrateFormData,
    extractFormData
};

export default renderForm;
