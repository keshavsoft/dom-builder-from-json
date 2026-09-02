import buildDataCellSpec from "./buildDataCellSpec.js";

/**
 * Helper: Builds single <tr> data row spec containing <td> cell specs
 */
export const buildDataRowSpec = ({ inRowData, inRowIndex, inColumns, inTrSpec, inTdSpec }) => {
    const localRowData = inRowData || {};
    const localRowIndex = inRowIndex;
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localTdSpec = inTdSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = localColumns.map(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        let cellValue;
        if (keyName === "#" || keyName === "sNo" || keyName === "serialNo") {
            cellValue = localRowIndex + 1;
        } else {
            cellValue = localRowData[keyName];
        }

        return buildDataCellSpec({
            inValue: cellValue,
            inTdSpec: localTdSpec
        });
    });

    return trNode;
};

export default buildDataRowSpec;
