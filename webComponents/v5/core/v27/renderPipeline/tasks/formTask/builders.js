import { applyBindings } from "../common/index.js";

const buildFormFields = ({ inColumns, inTemplates }) => {
    const localColumns = inColumns;
    const localTemplates = inTemplates;

    if (!Array.isArray(localColumns) || localColumns.length === 0) {
        return [];
    }

    const formFieldComposite = localTemplates?.composite?.formField;
    const template = formFieldComposite?.template;
    const bindings = formFieldComposite?.bindings;

    if (!template) {
        return [];
    }

    return localColumns.map(column => {
        return applyBindings({
            inTemplate: template,
            inBindings: bindings,
            inData: column
        });
    });
};

export {
    buildFormFields
};
