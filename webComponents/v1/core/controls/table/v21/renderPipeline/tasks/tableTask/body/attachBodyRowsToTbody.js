/**
 * Helper: Attaches body <tr> rows to <tbody> in tableSpec
 */
export const attachBodyRowsToTbody = ({ inTableSpec, inBodyRows }) => {
    const localTableSpec = inTableSpec;
    const localBodyRows = inBodyRows || [];

    const tbodyNode = localTableSpec.children?.find(child => child.tagName === "tbody");
    if (tbodyNode) {
        tbodyNode.children = localBodyRows;
    }
};

export default attachBodyRowsToTbody;
