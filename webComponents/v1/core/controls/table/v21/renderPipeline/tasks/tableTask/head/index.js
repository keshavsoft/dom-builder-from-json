import buildHeaderRowSpec from "./buildHeaderRowSpec.js";
import attachHeaderRowToThead from "./attachHeaderRowToThead.js";

/**
 * Head Module Orchestrator: Builds and attaches <thead> rows to tableSpec
 */
export const buildHead = ({ inTableSpec, inColumns, inTrSpec, inThSpec }) => {
    const localTableSpec = inTableSpec;
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (Array.isArray(localColumns) && localColumns.length > 0 && localTrSpec && localThSpec) {
        const headerRow = buildHeaderRowSpec({
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec
        });

        attachHeaderRowToThead({
            inTableSpec: localTableSpec,
            inHeaderRow: headerRow
        });
    }

    return localTableSpec;
};

export default buildHead;
