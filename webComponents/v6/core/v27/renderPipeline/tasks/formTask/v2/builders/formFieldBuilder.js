import { applyBindings } from "../../../common/index.js";

/**
 * Builds form fields directly from dataModel.fields using composite formField
 * Pure template stamping - zero calculations
 * Follows in -> local parameter naming convention
 */
const buildFormFields = ({ inDataModel, inTemplates }) => {
    const localDataModel = inDataModel;
    const localTemplates = inTemplates;

    const fields = localDataModel?.fields || (Array.isArray(localDataModel) ? localDataModel : []);

    if (!Array.isArray(fields) || fields.length === 0) {
        return [];
    }

    const formFieldComposite = localTemplates?.composite?.formField;
    const template = formFieldComposite?.template;
    const bindings = formFieldComposite?.bindings;

    if (!template) {
        return [];
    }

    return fields.map(field => {
        return applyBindings({
            inTemplate: template,
            inBindings: bindings,
            inData: field
        });
    });
};

export {
    buildFormFields
};

export default buildFormFields;
