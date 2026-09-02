import buildDataRowSpec from "./buildDataRowSpec.js";

/**
 * Helper: Builds array of <tr> body row specs from dataset array
 */
export const buildBodyRowsSpec = ({ inData, inColumns, inTrSpec, inTdSpec }) => {
    const localData = inData || [];
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localTdSpec = inTdSpec;

    return localData.map((rowData, rowIndex) =>
        buildDataRowSpec({
            inRowData: rowData,
            inRowIndex: rowIndex,
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inTdSpec: localTdSpec
        })
    );
};

export default buildBodyRowsSpec;
