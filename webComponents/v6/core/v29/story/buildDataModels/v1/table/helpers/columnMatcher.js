/**
 * Helper to match a column against row configuration keys
 * Follows in -> local parameter naming convention
 */

export const findConfigForColumn = ({ inRowConfig, inColumn }) => {
    const localRowConfig = inRowConfig;
    const localColumn = inColumn;

    if (!localRowConfig || typeof localRowConfig !== "object" || !localColumn) {
        return null;
    }

    const colKey = localColumn.key;
    const colLabel = localColumn.label;

    if (colKey && colKey in localRowConfig) {
        return localRowConfig[colKey];
    }

    if (colLabel && colLabel in localRowConfig) {
        return localRowConfig[colLabel];
    }

    const lowerKey = typeof colKey === "string" ? colKey.toLowerCase() : "";
    const lowerLabel = typeof colLabel === "string" ? colLabel.toLowerCase() : "";

    for (const [confKey, confVal] of Object.entries(localRowConfig)) {
        const lowerConf = confKey.toLowerCase();
        if (lowerConf === lowerKey || lowerConf === lowerLabel) {
            return confVal;
        }
        if (lowerKey.endsWith("." + lowerConf) || lowerKey.endsWith("_" + lowerConf)) {
            return confVal;
        }
    }

    return null;
};

export default findConfigForColumn;
