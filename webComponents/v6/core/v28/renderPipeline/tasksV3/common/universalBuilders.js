import { applyBindings } from "./index.js";

/**
 * Universal builder map for all spec tree steps
 * Pure template stamping - zero calculations
 * Follows in -> local parameter naming convention
 */
export const universalBuilderMap = {
    tableHeaderCell: ({ inDataModel, inTemplates }) => {
        const localDataModel = inDataModel;
        const localTemplates = inTemplates;

        const columns = localDataModel?.tHead || [];
        const composite = localTemplates?.composite?.tableHeaderCell;

        if (!composite?.template || !Array.isArray(columns)) {
            return [];
        }

        return columns.map(column => {
            return applyBindings({
                inTemplate: composite.template,
                inBindings: composite.bindings,
                inData: column
            });
        });
    },

    tableRow: ({ inDataModel, inTemplates }) => {
        const localDataModel = inDataModel;
        const localTemplates = inTemplates;

        const columns = localDataModel?.tHead || [];
        const rows = localDataModel?.tBody || [];
        const rowComposite = localTemplates?.composite?.tableRow;
        const cellComposite = localTemplates?.composite?.tableDataCell;

        if (!rowComposite?.template || !cellComposite?.template || !Array.isArray(rows)) {
            return [];
        }

        return rows.map((item, rowIndex) => {
            const rowNode = JSON.parse(JSON.stringify(rowComposite.template));
            rowNode.attributes = rowNode.attributes || {};
            rowNode.attributes.class = rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50";

            rowNode.children = columns.map(column => {
                const value = item[column.key];
                const cellData = {
                    key: column.key,
                    value: value !== null && value !== undefined ? String(value) : ""
                };

                return applyBindings({
                    inTemplate: cellComposite.template,
                    inBindings: cellComposite.bindings,
                    inData: cellData
                });
            });

            return rowNode;
        });
    },

    tableFooterRow: ({ inDataModel, inTemplates }) => {
        const localDataModel = inDataModel;
        const localTemplates = inTemplates;

        const tFoot = localDataModel?.tFoot;
        const tHead = localDataModel?.tHead;

        if (!Array.isArray(tFoot) || tFoot.length === 0 || !Array.isArray(tHead)) {
            return [];
        }

        const rowComposite = localTemplates?.composite?.tableFooterRow || localTemplates?.composite?.tableRow;
        const cellComposite = localTemplates?.composite?.tableFooterCell || localTemplates?.composite?.tableDataCell;

        if (!rowComposite?.template || !cellComposite?.template) {
            return [];
        }

        return tFoot.map(footRow => {
            const rowNode = JSON.parse(JSON.stringify(rowComposite.template));
            rowNode.attributes = rowNode.attributes || {};

            if (footRow.rowType === "summaryRow") {
                rowNode.attributes.class = "bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900";
            } else {
                rowNode.attributes.class = "bg-gray-50 font-semibold border-t border-gray-200 text-gray-800";
            }

            rowNode.children = tHead.map(column => {
                const value = footRow.data?.[column.key];

                return applyBindings({
                    inTemplate: cellComposite.template,
                    inBindings: cellComposite.bindings,
                    inData: {
                        key: column.key,
                        value: value !== null && value !== undefined ? value : ""
                    }
                });
            });

            return rowNode;
        });
    },

    formField: ({ inDataModel, inTemplates }) => {
        const localDataModel = inDataModel;
        const localTemplates = inTemplates;

        const fields = localDataModel?.fields || (Array.isArray(localDataModel) ? localDataModel : []);
        const composite = localTemplates?.composite?.formField;

        if (!composite?.template || !Array.isArray(fields)) {
            return [];
        }

        return fields.map(field => {
            return applyBindings({
                inTemplate: composite.template,
                inBindings: composite.bindings,
                inData: field
            });
        });
    }
};

export default universalBuilderMap;
