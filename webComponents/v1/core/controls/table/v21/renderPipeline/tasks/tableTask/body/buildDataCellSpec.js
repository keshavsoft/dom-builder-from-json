/**
 * Helper: Builds individual <td> body data cell spec for a column and row value
 */
export const buildDataCellSpec = ({ inValue, inTdSpec }) => {
    const localValue = inValue;
    const localTdSpec = inTdSpec;

    const tdNode = JSON.parse(JSON.stringify(localTdSpec));
    tdNode.textContent = localValue !== undefined && localValue !== null ? String(localValue) : "";

    return tdNode;
};

export default buildDataCellSpec;
