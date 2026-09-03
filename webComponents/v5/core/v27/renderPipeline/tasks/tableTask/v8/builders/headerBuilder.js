import { applyBindings } from "../../../common/index.js";

/**
 * Builds table header cells from dataModel.tHead
 * Pure template stamping - zero calculations
 * Follows in -> local parameter naming convention
 */
const buildHeaderCells = ({ inDataModel, inColumns, inTemplates }) => {
    const localDataModel = inDataModel;
    const localColumns = localDataModel?.tHead || inColumns;
    const localTemplates = inTemplates;

    if (!Array.isArray(localColumns)) {
        return [];
    }

    const headerCellComposite = localTemplates?.composite?.tableHeaderCell;
    const template = headerCellComposite?.template;
    const bindings = headerCellComposite?.bindings;

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
    buildHeaderCells
};

export default buildHeaderCells;
