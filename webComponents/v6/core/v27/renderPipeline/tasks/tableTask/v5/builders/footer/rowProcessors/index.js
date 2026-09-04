import { processSummaryRow } from "./summaryRowProcessor.js";
import { processBalanceRow } from "./balanceRowProcessor.js";
import { processInputsRow } from "./inputsRowProcessor.js";

/**
 * Registry of footer row processors.
 * Highly extensible: any new row types (e.g. taxRow, customRow, actionRow) can simply be registered here.
 */
const rowProcessorRegistry = [
    {
        type: "summary",
        match: inKey => inKey === "summaryRow",
        processor: processSummaryRow
    },
    {
        type: "balance",
        match: inKey => inKey === "balanceRow",
        processor: processBalanceRow
    },
    {
        type: "inputs",
        match: inKey => inKey === "inputsRow",
        processor: processInputsRow
    }
];

const findProcessor = ({ inRowKey }) => {
    const localRowKey = inRowKey;

    if (!localRowKey) {
        return null;
    }

    const entry = rowProcessorRegistry.find(item => item.match(localRowKey));
    return entry ? entry.processor : null;
};

export {
    rowProcessorRegistry,
    findProcessor,
    processSummaryRow,
    processBalanceRow,
    processInputsRow
};

export default findProcessor;
