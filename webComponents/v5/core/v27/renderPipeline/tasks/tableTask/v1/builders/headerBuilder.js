import { applyBindings } from "../../../common/index.js";

const buildHeaderCells = ({ inColumns, inTemplates }) => {
    const localColumns = inColumns;
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
