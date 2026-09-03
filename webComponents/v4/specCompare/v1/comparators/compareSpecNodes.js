import comparePrimitiveValues from "./comparePrimitiveValues.js";
import compareAttributeObjects from "./compareAttributeObjects.js";
import compareChildrenArrays from "./compareChildrenArrays.js";

export const compareSpecNodes = ({ inFromSpec, inToSpec, inPath = "" }) => {
    const localFromSpec = inFromSpec;
    const localToSpec = inToSpec;
    const localPath = inPath;

    const missingInTo = [];
    const extraInTo = [];
    const mismatches = [];

    if (!localFromSpec && !localToSpec) {
        return { missingInTo, extraInTo, mismatches };
    }

    if (localFromSpec && !localToSpec) {
        missingInTo.push({
            path: localPath || "root",
            value: localFromSpec,
            reason: `Spec node present in source JSON (from), but missing in reconstructed JSON (to)`
        });
        return { missingInTo, extraInTo, mismatches };
    }

    if (!localFromSpec && localToSpec) {
        extraInTo.push({
            path: localPath || "root",
            value: localToSpec,
            reason: `Spec node present in reconstructed JSON (to), but missing in source JSON (from)`
        });
        return { missingInTo, extraInTo, mismatches };
    }

    // 1. Compare tagName
    const tagPath = localPath ? `${localPath}.tagName` : "tagName";
    const tagResult = comparePrimitiveValues({
        inFromValue: localFromSpec.tagName,
        inToValue: localToSpec.tagName,
        inPath: tagPath
    });
    if (!tagResult.isEqual) {
        mismatches.push(tagResult.mismatch);
    }

    // 2. Compare textContent (if present)
    if (localFromSpec.textContent !== undefined || localToSpec.textContent !== undefined) {
        const textPath = localPath ? `${localPath}.textContent` : "textContent";
        if (localFromSpec.textContent !== undefined && localToSpec.textContent === undefined) {
            missingInTo.push({
                path: textPath,
                value: localFromSpec.textContent,
                reason: `textContent present in source JSON (from), but missing in reconstructed JSON (to)`
            });
        } else if (localFromSpec.textContent === undefined && localToSpec.textContent !== undefined) {
            extraInTo.push({
                path: textPath,
                value: localToSpec.textContent,
                reason: `textContent present in reconstructed JSON (to), but missing in source JSON (from)`
            });
        } else {
            const textResult = comparePrimitiveValues({
                inFromValue: localFromSpec.textContent,
                inToValue: localToSpec.textContent,
                inPath: textPath
            });
            if (!textResult.isEqual) {
                mismatches.push(textResult.mismatch);
            }
        }
    }

    // 3. Compare Attributes
    const attrPath = localPath ? `${localPath}.attributes` : "attributes";
    const attrResult = compareAttributeObjects({
        inFromAttrs: localFromSpec.attributes,
        inToAttrs: localToSpec.attributes,
        inPath: attrPath
    });
    missingInTo.push(...attrResult.missingInTo);
    extraInTo.push(...attrResult.extraInTo);
    mismatches.push(...attrResult.mismatches);

    // 4. Compare Children
    const childrenPath = localPath ? `${localPath}.children` : "children";
    const childrenResult = compareChildrenArrays({
        inFromChildren: localFromSpec.children,
        inToChildren: localToSpec.children,
        inPath: childrenPath
    });
    missingInTo.push(...childrenResult.missingInTo);
    extraInTo.push(...childrenResult.extraInTo);
    mismatches.push(...childrenResult.mismatches);

    return { missingInTo, extraInTo, mismatches };
};

export default compareSpecNodes;
