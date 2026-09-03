import buildDataCellSpec from "./buildDataCellSpec.js";

/**
 * Helper: Builds single <tr> data row spec containing <td> cell specs from pre-shaped rowData entries
 */
export const buildDataRowSpec = ({ inRowData, inRowIndex, inTrSpec, inTdSpec }) => {
    const localRowData = inRowData || {};
    const localRowIndex = inRowIndex;
    const localTrSpec = inTrSpec;
    const localTdSpec = inTdSpec;

    const trNode = JSON.parse(JSON.stringify(localTrSpec));
    trNode.children = Object.entries(localRowData).map(([key, value]) => {
        let cellValue;
        if (key === "#" || key === "sNo" || key === "serialNo") {
            cellValue = localRowIndex + 1;
        } else {
            cellValue = value;
        };

        return buildDataCellSpec({
            inValue: cellValue,
            inTdSpec: localTdSpec
        });
    });

    return trNode;
};

export default buildDataRowSpec;
