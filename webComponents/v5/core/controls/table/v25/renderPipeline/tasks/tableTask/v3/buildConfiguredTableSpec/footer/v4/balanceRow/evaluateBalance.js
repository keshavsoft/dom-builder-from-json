/**
 * Helper: Evaluates balance row expressions (e.g. "Credit-Debit", "Debit-Credit")
 * purely using values from inSummaryRowObject.
 * If inFuncType (localBalanceConfig[columnKey]) is not configured/empty, returns "".
 */
export const evaluateBalance = ({ inColumnKey, inFuncType, inSummaryRowObject }) => {
    const localColumnKey = inColumnKey;
    const localFuncType = typeof inFuncType === "string" ? inFuncType.trim() : String(inFuncType || "");
    const localSummaryRowObject = inSummaryRowObject || {};

    // If column key is not explicitly configured in balanceConfig, return empty string
    if (!inFuncType || !localFuncType) {
        return "";
    }

    // 1. Check for binary arithmetic operators (-, +, *, /)
    const operators = ["-", "+", "*", "/"];
    for (const op of operators) {
        if (localFuncType.includes(op)) {
            const parts = localFuncType.split(op).map(p => p.trim());
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

    // 2. Direct key lookup in localSummaryRowObject (e.g. inFuncType = "Credit")
    if (localSummaryRowObject[localFuncType] !== undefined) {
        return String(localSummaryRowObject[localFuncType]);
    }

    return String(inFuncType);
};

export default evaluateBalance;
