export const compareAttributeObjects = ({ inFromAttrs, inToAttrs, inPath = "attributes" }) => {
    const localFromAttrs = inFromAttrs || {};
    const localToAttrs = inToAttrs || {};
    const localPath = inPath;

    const missingInTo = [];
    const extraInTo = [];
    const mismatches = [];

    const fromKeys = Object.keys(localFromAttrs);
    const toKeys = Object.keys(localToAttrs);

    // 1. Keys in 'from' but missing in 'to'
    fromKeys.forEach(key => {
        const currentPath = `${localPath}.${key}`;
        if (!(key in localToAttrs)) {
            missingInTo.push({
                path: currentPath,
                value: localFromAttrs[key],
                reason: `Attribute "${key}" present in source JSON (from), but missing in reconstructed JSON (to)`
            });
        } else if (localFromAttrs[key] !== localToAttrs[key]) {
            mismatches.push({
                path: currentPath,
                fromValue: localFromAttrs[key],
                toValue: localToAttrs[key],
                reason: `Attribute "${key}" mismatch: source (from) is "${localFromAttrs[key]}", reconstructed (to) is "${localToAttrs[key]}"`
            });
        }
    });

    // 2. Keys in 'to' but missing in 'from'
    toKeys.forEach(key => {
        const currentPath = `${localPath}.${key}`;
        if (!(key in localFromAttrs)) {
            extraInTo.push({
                path: currentPath,
                value: localToAttrs[key],
                reason: `Attribute "${key}" present in reconstructed JSON (to), but missing in source JSON (from)`
            });
        }
    });

    return { missingInTo, extraInTo, mismatches };
};

export default compareAttributeObjects;
