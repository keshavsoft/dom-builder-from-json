import { applyBindings } from "../../../common/index.js";

const buildDataRows = ({ inColumns, inData, inTemplates }) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;

    if (!Array.isArray(localColumns) || !Array.isArray(localData)) {
        return [];
    }

    const rowComposite = localTemplates?.composite?.tableRow;
    const dataCellComposite = localTemplates?.composite?.tableDataCell;

    const rowTemplate = rowComposite?.template;
    const cellTemplate = dataCellComposite?.template;
    const cellBindings = dataCellComposite?.bindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    return localData.map((item, rowIndex) => {
        const rowNode = JSON.parse(JSON.stringify(rowTemplate));
        if (!rowNode.attributes) {
            rowNode.attributes = {};
        }
        rowNode.attributes.class = rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50";

        const rowTdNodes = localColumns.map(column => {
            const value = item[column.key];
            const cellData = {
                key: column.key,
                value: value !== null && value !== undefined ? String(value) : ""
            };

            return applyBindings({
                inTemplate: cellTemplate,
                inBindings: cellBindings,
                inData: cellData
            });
        });

        rowNode.children = rowTdNodes;
        return rowNode;
    });
};

export {
    buildDataRows
};

export default buildDataRows;
