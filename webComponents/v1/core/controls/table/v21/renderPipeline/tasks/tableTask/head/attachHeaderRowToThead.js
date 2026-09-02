/**
 * Helper: Attaches header <tr> row to <thead> in tableSpec
 */
export const attachHeaderRowToThead = ({ inTableSpec, inHeaderRow }) => {
    const localTableSpec = inTableSpec;
    const localHeaderRow = inHeaderRow;

    const theadNode = localTableSpec.children?.find(child => child.tagName === "thead");
    if (theadNode) {
        theadNode.children = [localHeaderRow];
    }
};

export default attachHeaderRowToThead;
