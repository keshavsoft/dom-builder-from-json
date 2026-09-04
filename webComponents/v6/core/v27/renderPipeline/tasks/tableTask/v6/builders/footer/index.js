import { buildFooterRows } from "./footerBuilder.js";
import { aggFuncs, count, sum, avg, min, max, extractNumber } from "./aggFuncs.js";
import { rowProcessorRegistry, findProcessor } from "./rowProcessors/index.js";

export {
    buildFooterRows,
    aggFuncs,
    count,
    sum,
    avg,
    min,
    max,
    extractNumber,
    rowProcessorRegistry,
    findProcessor
};

export default buildFooterRows;
