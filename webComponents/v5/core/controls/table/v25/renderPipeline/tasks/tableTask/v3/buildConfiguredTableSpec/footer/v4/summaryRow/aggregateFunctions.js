/**
 * Utility: Evaluates aggregate functions (count, sum, avg/mean, min, max) on dataset for a column
 */
export const calculateAggregate = ({ inData, inColumnKey, inFuncType }) => {
    const localData = inData || [];
    const localColumnKey = inColumnKey;
    const localFuncType = typeof inFuncType === "string" ? inFuncType.toLowerCase().trim() : "";

    if (!localFuncType) {
        return typeof inFuncType === "number" || typeof inFuncType === "string" ? String(inFuncType) : "";
    }

    if (localFuncType === "count") {
        return String(localData.length);
    }

    // Extract valid numeric values for column
    const numericValues = localData
        .map(row => Number(row[localColumnKey]))
        .filter(val => !isNaN(val));

    if (numericValues.length === 0) {
        return "0";
    }

    if (localFuncType === "sum") {
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        return String(sum);
    }

    if (localFuncType === "avg" || localFuncType === "mean") {
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        const avg = sum / numericValues.length;
        return String(Math.round(avg * 100) / 100);
    }

    if (localFuncType === "min") {
        return String(Math.min(...numericValues));
    }

    if (localFuncType === "max") {
        return String(Math.max(...numericValues));
    }

    return String(inFuncType);
};

export default calculateAggregate;
