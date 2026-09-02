/**
 * Helper: Attaches footer <tr> row to <tfoot> in tableSpec
 */
export const attachFooterRowToTfoot = ({ inTableSpec, inFooterRow }) => {
    const localTableSpec = inTableSpec;
    const localFooterRow = inFooterRow;

    const tfootNode = localTableSpec.children?.find(child => child.tagName === "tfoot");
    if (tfootNode) {
        tfootNode.children = [localFooterRow];
    }
};

export default attachFooterRowToTfoot;
