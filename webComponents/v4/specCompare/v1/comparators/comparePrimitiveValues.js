export const comparePrimitiveValues = ({ inFromValue, inToValue, inPath = "" }) => {
    const localFromValue = inFromValue;
    const localToValue = inToValue;
    const localPath = inPath;

    if (localFromValue === localToValue) {
        return { isEqual: true, mismatch: null };
    }

    return {
        isEqual: false,
        mismatch: {
            path: localPath,
            fromValue: localFromValue,
            toValue: localToValue,
            reason: `Value mismatch at ${localPath}: expected "${localFromValue}", got "${localToValue}"`
        }
    };
};

export default comparePrimitiveValues;
