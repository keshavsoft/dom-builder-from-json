import calculateAggregate from "./aggregateFunctions.js";

/**
 * Step 1: Generates key-value data object of summary values for each column
 * Output format: { [columnKey]: "value", ... }
 */
export const getObject = ({ inSummaryConfig, inColumns, inData }) => {
    const localSummaryConfig = inSummaryConfig || {};
    const localColumns = inColumns || [];
    const localData = inData || [];

    const summaryDataObject = {};

    localColumns.forEach(columnKey => {
        const keyName = typeof columnKey === "object"
            ? (columnKey.field || columnKey.name || columnKey.label)
            : columnKey;

        const funcType = localSummaryConfig[keyName];

        summaryDataObject[keyName] = calculateAggregate({
            inData: localData,
            inColumnKey: keyName,
            inFuncType: funcType
        });
    });

    return summaryDataObject;
};

export default getObject;
