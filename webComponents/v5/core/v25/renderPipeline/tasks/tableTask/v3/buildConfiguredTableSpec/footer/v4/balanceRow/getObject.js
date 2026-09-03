import evaluateBalance from "./evaluateBalance.js";

/**
 * Step 1: Generates key-value data object of balance values for each column.
 * Purely relies on inSummaryRowObject and never accepts dataset (inData).
 * Output format: { [columnKey]: "value", ... }
 */
export const getObject = ({ inBalanceConfig, inColumns, inSummaryRowObject }) => {
    const localBalanceConfig = inBalanceConfig || {};
    const localColumns = inColumns || [];
    const localSummaryRowObject = inSummaryRowObject || {};

    const balanceDataObject = {};

    localColumns.forEach(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const funcType = localBalanceConfig[keyName];

        balanceDataObject[keyName] = evaluateBalance({
            inColumnKey: keyName,
            inFuncType: funcType,
            inSummaryRowObject: localSummaryRowObject
        });
    });

    return balanceDataObject;
};

export default getObject;
