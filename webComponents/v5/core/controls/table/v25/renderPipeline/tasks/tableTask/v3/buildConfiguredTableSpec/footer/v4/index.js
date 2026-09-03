import processSummaryRow from "./rowProcessors/processSummaryRow.js";
import processBalanceRow from "./rowProcessors/processBalanceRow.js";
import processInputsRows from "./rowProcessors/processInputsRows.js";

/**
 * Footer Module (v4): Clean Story Orchestrator
 * Step 1: Process summary totals row spec
 * Step 2: Process balance formula row spec
 * Step 3: Process input fields rows spec
 * Step 4: Assemble & return sequence of row specs
 */
export const buildFooter = ({
    inFooterConfig,
    inHasFooterConfig,
    inColumns,
    inData,
    inTrSpec,
    inThSpec,
    inInputSpec
}) => {
    const localFooterConfig = inFooterConfig;
    const localHasFooterConfig = inHasFooterConfig;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;
    const localInputSpec = inInputSpec;

    if (!localHasFooterConfig || !localFooterConfig || typeof localFooterConfig !== "object") {
        return null;
    }

    // Story step 1: Process summary totals row
    const summaryRowSpec = processSummaryRow({
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });

    // Story step 2: Process balance formula row
    const balanceRowSpec = processBalanceRow({
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });

    // Story step 3: Process input fields rows
    const inputsRowSpecs = processInputsRows({
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec,
        inInputSpec: localInputSpec
    });

    // Story step 4: Combine all footer row specs in sequence
    return [summaryRowSpec, balanceRowSpec, ...inputsRowSpecs].filter(Boolean);
};

export default buildFooter;
