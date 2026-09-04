/**
 * Helper for matching configured keys with table column keys, suffixes, and labels
 * Follows in -> local parameter naming convention
 */
const matchesColumn = ({ inConfigKey, inColumn }) => {
    const localConfigKey = String(inConfigKey || "").toLowerCase().trim();
    const colKey = String(inColumn?.key || "").toLowerCase().trim();
    const colSuffix = colKey.split(".").pop();
    const colLabel = String(inColumn?.label || "").toLowerCase().trim();

    return (
        localConfigKey === colKey ||
        localConfigKey === colSuffix ||
        localConfigKey === colLabel
    );
};

const findConfigForColumn = ({ inRowConfig, inColumn }) => {
    const localRowConfig = inRowConfig;
    const localColumn = inColumn;

    if (!localRowConfig || !localColumn) {
        return null;
    }

    for (const [cfgKey, cfgValue] of Object.entries(localRowConfig)) {
        if (matchesColumn({ inConfigKey: cfgKey, inColumn: localColumn })) {
            return cfgValue;
        }
    }

    return null;
};

export {
    matchesColumn,
    findConfigForColumn
};

export default findConfigForColumn;
