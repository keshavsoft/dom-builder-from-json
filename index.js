import { registerComponent } from "./webComponents/v2/core/componentRegister.js";
import pullAttributes from "./webComponents/v2/core/pullAttributes.js";
import resolveSpec from "./webComponents/v2/core/specResolver.js";
import renderTable, {
    renderSkeleton as renderTableSkeleton,
    bindSkeletonEvents as bindTableSkeletonEvents,
    renderUserUI as renderTableUserUI,
    prepareTableData,
    hydrateTableData
} from "./webComponents/v2/core/controls/table/v1/index.js";
import renderForm, {
    renderSkeleton as renderFormSkeleton,
    renderSkeletonHtml as renderFormSkeletonHtml,
    bindSkeletonEvents as bindFormSkeletonEvents,
    renderUserUI as renderFormUserUI,
    hydrateFormData,
    extractFormData
} from "./webComponents/v2/core/controls/form/v1/index.js";

// Re-export Core Controls
export {
    // Table 3-Layer Orchestration & Sub-modules
    renderTable,
    renderTableSkeleton,
    bindTableSkeletonEvents,
    renderTableUserUI,
    prepareTableData,
    hydrateTableData,

    // Form 3-Layer Orchestration & Sub-modules
    renderForm,
    renderFormSkeleton,
    renderFormSkeletonHtml,
    bindFormSkeletonEvents,
    renderFormUserUI,
    hydrateFormData,
    extractFormData,

    // Core Helpers
    registerComponent,
    pullAttributes,
    resolveSpec
};

export default {
    renderTable,
    renderForm,
    registerComponent,
    pullAttributes,
    resolveSpec
};
