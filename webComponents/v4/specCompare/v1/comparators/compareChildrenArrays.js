import compareSpecNodes from "./compareSpecNodes.js";

export const compareChildrenArrays = ({ inFromChildren, inToChildren, inPath = "children" }) => {
    const localFromChildren = inFromChildren || [];
    const localToChildren = inToChildren || [];
    const localPath = inPath;

    const missingInTo = [];
    const extraInTo = [];
    const mismatches = [];

    const maxLength = Math.max(localFromChildren.length, localToChildren.length);

    for (let i = 0; i < maxLength; i++) {
        const currentPath = `${localPath}[${i}]`;
        const fromChild = localFromChildren[i];
        const toChild = localToChildren[i];

        if (fromChild && !toChild) {
            missingInTo.push({
                path: currentPath,
                value: fromChild,
                reason: `Child spec at index [${i}] present in source JSON (from), but missing in reconstructed JSON (to)`
            });
        } else if (!fromChild && toChild) {
            extraInTo.push({
                path: currentPath,
                value: toChild,
                reason: `Child spec at index [${i}] present in reconstructed JSON (to), but missing in source JSON (from)`
            });
        } else if (fromChild && toChild) {
            const childResult = compareSpecNodes({ inFromSpec: fromChild, inToSpec: toChild, inPath: currentPath });
            missingInTo.push(...childResult.missingInTo);
            extraInTo.push(...childResult.extraInTo);
            mismatches.push(...childResult.mismatches);
        }
    }

    return { missingInTo, extraInTo, mismatches };
};

export default compareChildrenArrays;
