import { getObject as getSummaryObject } from "./summaryRow/index.js";
import { getObject as getBalanceObject } from "./balanceRow/index.js";
import { getObject as getInputsObject } from "./inputsRow/index.js";

/**
 * Helper Pipeline: Collects all footer row data objects in sequential order
 */
export const collectFooterDataObjects = ({ inFooterConfig, inColumns, inData }) => {
    const localFooterConfig = inFooterConfig || {};
    const localColumns = inColumns || [];
    const localData = inData || [];

    const footerDataObjects = [];

    // 1. Process summaryRow
    if (localFooterConfig.summaryRow && typeof localFooterConfig.summaryRow === "object") {
        const summaryRowObject = getSummaryObject({
            inSummaryConfig: localFooterConfig.summaryRow,
            inColumns: localColumns,
            inData: localData
        });
        if (summaryRowObject) {
            footerDataObjects.push(summaryRowObject);
        }
    }

    // 2. Process balanceRow (relies on summaryRow data object)
    if (localFooterConfig.balanceRow && typeof localFooterConfig.balanceRow === "object") {
        const summaryRowObject = footerDataObjects[0] || {};
        const balanceRowObject = getBalanceObject({
            inBalanceConfig: localFooterConfig.balanceRow,
            inColumns: localColumns,
            inSummaryRowObject: summaryRowObject
        });
        if (balanceRowObject) {
            footerDataObjects.push(balanceRowObject);
        }
    };


    // 3. Process inputsRow (can be a single row or an array of multiple input rows)
    if (localFooterConfig.inputsRow) {
        // console.log("aaaaaaaaaaaaaa : ", localFooterConfig);
        const inputsDataObjects = getInputsObject({
            inInputsConfig: localFooterConfig.inputsRow,
            inColumns: localColumns
        });
        if (Array.isArray(inputsDataObjects)) {
            footerDataObjects.push(...inputsDataObjects);
        } else if (inputsDataObjects && typeof inputsDataObjects === "object") {
            footerDataObjects.push(inputsDataObjects);
        }
    }

    return footerDataObjects;
};

export default collectFooterDataObjects;
