/**
 * Aggregation functions for table footer calculations
 * Follows in -> local parameter naming convention
 */

const extractNumber = ({ inValue }) => {
    const localValue = inValue;

    if (typeof localValue === "number") {
        return localValue;
    }

    if (typeof localValue === "string") {
        // Extract numeric part from strings like " 3.560 kgs", "1,000.00", "Rs.205/-"
        const cleanStr = localValue.replace(/,/g, "").trim();
        const match = cleanStr.match(/-?\d+(\.\d+)?/);
        if (match) {
            const parsed = parseFloat(match[0]);
            return isNaN(parsed) ? 0 : parsed;
        }
    }

    return 0;
};

const count = ({ inData, inKey }) => {
    const localData = inData;
    const localKey = inKey;

    if (!Array.isArray(localData)) {
        return 0;
    }

    if (!localKey) {
        return localData.length;
    }

    return localData.filter(item => {
        const val = item?.[localKey];
        return val !== null && val !== undefined && val !== "";
    }).length;
};

const sum = ({ inData, inKey }) => {
    const localData = inData;
    const localKey = inKey;

    if (!Array.isArray(localData) || !localKey) {
        return 0;
    }

    const total = localData.reduce((accum, item) => {
        return accum + extractNumber({ inValue: item?.[localKey] });
    }, 0);

    return Number(total.toFixed(2));
};

const avg = ({ inData, inKey }) => {
    const localData = inData;
    const localKey = inKey;

    if (!Array.isArray(localData) || localData.length === 0 || !localKey) {
        return 0;
    }

    const total = sum({ inData: localData, inKey: localKey });
    const countVal = count({ inData: localData, inKey: localKey });

    if (countVal === 0) {
        return 0;
    }

    return Number((total / countVal).toFixed(2));
};

const min = ({ inData, inKey }) => {
    const localData = inData;
    const localKey = inKey;

    if (!Array.isArray(localData) || localData.length === 0 || !localKey) {
        return 0;
    }

    const numbers = localData
        .map(item => extractNumber({ inValue: item?.[localKey] }))
        .filter(n => !isNaN(n));

    if (numbers.length === 0) {
        return 0;
    }

    return Math.min(...numbers);
};

const max = ({ inData, inKey }) => {
    const localData = inData;
    const localKey = inKey;

    if (!Array.isArray(localData) || localData.length === 0 || !localKey) {
        return 0;
    }

    const numbers = localData
        .map(item => extractNumber({ inValue: item?.[localKey] }))
        .filter(n => !isNaN(n));

    if (numbers.length === 0) {
        return 0;
    }

    return Math.max(...numbers);
};

const aggFuncs = {
    count,
    sum,
    avg,
    average: avg,
    min,
    max
};

export {
    aggFuncs,
    count,
    sum,
    avg,
    min,
    max,
    extractNumber
};

export default aggFuncs;
