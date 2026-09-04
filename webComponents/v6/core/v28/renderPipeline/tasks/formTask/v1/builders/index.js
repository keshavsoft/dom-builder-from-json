import { buildFormFields } from "./formFieldBuilder.js";

const builderMap = {
    formField: buildFormFields,
    formFields: buildFormFields
};

export {
    builderMap,
    buildFormFields
};

export default builderMap;
