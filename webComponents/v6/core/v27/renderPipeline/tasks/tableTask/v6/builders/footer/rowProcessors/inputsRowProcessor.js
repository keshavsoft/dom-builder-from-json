import { applyBindings } from "../../../../../common/index.js";
import { matchesColumn, findConfigForColumn } from "../helpers/columnMatcher.js";

/**
 * Inputs Row Processor: Renders interactive input fields in designated columns
 * Follows in -> local parameter naming convention
 */
const processInputsRow = ({ inRowConfig, inColumns, inTemplates }) => {
    const localRowConfig = inRowConfig;
    const localColumns = inColumns;
    const localTemplates = inTemplates;

    if (!localRowConfig || !Array.isArray(localColumns)) {
        return [];
    }

    const footerRowComposite = localTemplates?.composite?.tableFooterRow || localTemplates?.composite?.tableRow;
    const footerCellComposite = localTemplates?.composite?.tableFooterCell || localTemplates?.composite?.tableDataCell;
    const footerInputCellComposite = localTemplates?.composite?.tableFooterInputCell;

    const rowTemplate = footerRowComposite?.template;
    const cellTemplate = footerCellComposite?.template;
    const cellBindings = footerCellComposite?.bindings;

    const inputCellTemplate = footerInputCellComposite?.template || cellTemplate;
    const inputCellBindings = footerInputCellComposite?.bindings || cellBindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    // Helper: Check if a column matches an input config entry
    const isColumnConfigured = ({ inDef, inColumn }) => {
        const localDef = inDef;
        const localCol = inColumn;

        if (Array.isArray(localDef)) {
            return localDef.some(item => typeof item === "string" && matchesColumn({ inConfigKey: item, inColumn: localCol }));
        }

        if (typeof localDef === "object" && localDef !== null) {
            return Object.keys(localDef).some(key => matchesColumn({ inConfigKey: key, inColumn: localCol }));
        }

        return false;
    };

    // Normalize: Handle array of arrays [[col1, col2]], single array [col1, col2], or object { col1: "" }
    const inputDefs = Array.isArray(localRowConfig) && localRowConfig.length > 0 && Array.isArray(localRowConfig[0])
        ? localRowConfig
        : [localRowConfig];

    const generatedRows = [];

    for (const singleDef of inputDefs) {
        const rowNode = JSON.parse(JSON.stringify(rowTemplate));
        rowNode.attributes = rowNode.attributes || {};
        rowNode.attributes.class = "bg-white border-t border-gray-200 text-gray-800";

        const tdCells = localColumns.map(column => {
            const hasInput = isColumnConfigured({ inDef: singleDef, inColumn: column });

            if (hasInput) {
                const initialValue = typeof singleDef === "object" && !Array.isArray(singleDef)
                    ? (findConfigForColumn({ inRowConfig: singleDef, inColumn: column }) || "")
                    : "";

                return applyBindings({
                    inTemplate: inputCellTemplate,
                    inBindings: inputCellBindings,
                    inData: {
                        key: column.key,
                        placeholder: column.label || column.key,
                        value: String(initialValue)
                    }
                });
            }

            return applyBindings({
                inTemplate: cellTemplate,
                inBindings: cellBindings,
                inData: {
                    key: column.key,
                    value: ""
                }
            });
        });

        rowNode.children = tdCells;
        generatedRows.push(rowNode);
    }

    return generatedRows;
};

export {
    processInputsRow
};

export default processInputsRow;
