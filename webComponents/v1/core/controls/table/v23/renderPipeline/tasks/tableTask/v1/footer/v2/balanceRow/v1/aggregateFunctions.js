/**
 * Helper: Evaluates formula expression (e.g. "Credit-Debit", "Credit - Debit") or key lookup on summaryRowObject ONLY.
 * Balance row NEVER uses dataset aggregate functions.
 */
const evaluateFormula = ({ inFormula, inSummaryRowObject, inColumnKey }) => {
    const localFormula = inFormula;
    const localSummaryRowObject = inSummaryRowObject || {};
    const localColumnKey = inColumnKey;

    if (!localFormula) {
        return localSummaryRowObject[localColumnKey] !== undefined
            ? String(localSummaryRowObject[localColumnKey])
            : "";
    }

    // 1. Check for binary arithmetic operators (-, +, *, /)
    const operators = ["-", "+", "*", "/"];
    for (const op of operators) {
        if (localFormula.includes(op)) {
            const parts = localFormula.split(op).map(p => p.trim());
            if (parts.length === 2) {
                const [leftKey, rightKey] = parts;
                const hasLeft = localSummaryRowObject[leftKey] !== undefined;
                const hasRight = localSummaryRowObject[rightKey] !== undefined;

                if (hasLeft || hasRight || !isNaN(Number(leftKey)) || !isNaN(Number(rightKey))) {
                    const leftVal = hasLeft ? Number(localSummaryRowObject[leftKey]) : Number(leftKey);
                    const rightVal = hasRight ? Number(localSummaryRowObject[rightKey]) : Number(rightKey);

                    if (!isNaN(leftVal) && !isNaN(rightVal)) {
                        let res = 0;
                        if (op === "-") res = leftVal - rightVal;
                        else if (op === "+") res = leftVal + rightVal;
                        else if (op === "*") res = leftVal * rightVal;
                        else if (op === "/") res = rightVal !== 0 ? leftVal / rightVal : 0;

                        return String(res);
                    }
                }
            }
        }
    }

    // 2. Direct key lookup in localSummaryRowObject
    if (localSummaryRowObject[localFormula] !== undefined) {
        return String(localSummaryRowObject[localFormula]);
    }

    // 3. Fallback: check if localSummaryRowObject has value for current column key
    if (localSummaryRowObject[localColumnKey] !== undefined) {
        return String(localSummaryRowObject[localColumnKey]);
    }

    return String(inFormula);
};

/**
 * Utility: Evaluates balance row values purely using summaryRowObject.
 * NEVER calculates dataset aggregates.
 */
export const calculateAggregate = ({ inData, inColumnKey, inFuncType, inSummaryRowObject }) => {
    const localColumnKey = inColumnKey;
    const rawFuncType = typeof inFuncType === "string" ? inFuncType.trim() : String(inFuncType || "");
    const localSummaryRowObject = inSummaryRowObject || {};

    return evaluateFormula({
        inFormula: rawFuncType,
        inSummaryRowObject: localSummaryRowObject,
        inColumnKey: localColumnKey
    });
};

export default calculateAggregate;
