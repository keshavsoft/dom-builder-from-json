import { getObject as getInputsObject, buildRowSpec as buildInputsRowSpec } from "../inputsRow/index.js";

export const processInputsRows = ({ inFooterConfig, inColumns, inTrSpec, inThSpec, inInputSpec }) => {
    const localFooterConfig = inFooterConfig || {};
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localInputSpec = inInputSpec;

    if (!localFooterConfig.inputsRow) {
        return [];
    }

    const inputsData = getInputsObject({
        inInputsConfig: localFooterConfig.inputsRow,
        inColumns: localColumns
    });

    const inputsArray = Array.isArray(inputsData) ? inputsData : [inputsData].filter(Boolean);

    return inputsArray
        .map(dataObj => buildInputsRowSpec({
            inDataObject: dataObj,
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec,
            inInputSpec: localInputSpec
        }))
        .filter(Boolean);
};

export default processInputsRows;
