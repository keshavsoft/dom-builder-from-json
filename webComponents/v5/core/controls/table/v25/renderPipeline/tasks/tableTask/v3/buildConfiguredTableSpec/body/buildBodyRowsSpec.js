import buildDataRowSpec from "./buildDataRowSpec.js";

/**
 * Helper: Builds array of <tr> body row specs from pre-shaped dataset array
 */
export const buildBodyRowsSpec = ({ inData, inTrSpec, inTdSpec }) => {
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localTdSpec = inTdSpec;

    return localData.map((rowData, rowIndex) =>
        buildDataRowSpec({
            inRowData: rowData,
            inRowIndex: rowIndex,
            inTrSpec: localTrSpec,
            inTdSpec: localTdSpec
        })
    );
};

export default buildBodyRowsSpec;
