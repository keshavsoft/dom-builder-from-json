import { applyBindings } from "../../../common/index.js";

/**
 * Builds table footer rows directly from dataModel.tFoot and dataModel.tHead
 * Pure template stamping - zero calculations, zero math, zero aggFuncs
 * Follows in -> local parameter naming convention
 */
const buildFooterRows = ({ inDataModel, inTemplates }) => {
    const localDataModel = inDataModel;
    const localTemplates = inTemplates;

    const tFoot = localDataModel?.tFoot;
    const tHead = localDataModel?.tHead;

    if (!Array.isArray(tFoot) || tFoot.length === 0 || !Array.isArray(tHead)) {
        return [];
    }

    const footerRowComposite = localTemplates?.composite?.tableFooterRow || localTemplates?.composite?.tableRow;
    const footerCellComposite = localTemplates?.composite?.tableFooterCell || localTemplates?.composite?.tableDataCell;

    const rowTemplate = footerRowComposite?.template;
    const cellTemplate = footerCellComposite?.template;
    const cellBindings = footerCellComposite?.bindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    return tFoot.map(footRow => {
        const rowNode = JSON.parse(JSON.stringify(rowTemplate));
        rowNode.attributes = rowNode.attributes || {};

        if (footRow.rowType === "summaryRow") {
            rowNode.attributes.class = "bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900";
        } else {
            rowNode.attributes.class = "bg-gray-50 font-semibold border-t border-gray-200 text-gray-800";
        }

        const tdCells = tHead.map(column => {
            const value = footRow.data?.[column.key];

            return applyBindings({
                inTemplate: cellTemplate,
                inBindings: cellBindings,
                inData: {
                    key: column.key,
                    value: value ?? ""
                }
            });
        });

        rowNode.children = tdCells;
        return rowNode;
    });
};

export {
    buildFooterRows
};

export default buildFooterRows;
