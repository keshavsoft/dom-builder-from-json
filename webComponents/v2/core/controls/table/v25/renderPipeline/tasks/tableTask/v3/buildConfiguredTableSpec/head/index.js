import buildHeaderRowSpec from "./buildHeaderRowSpec.js";

/**
 * Head Module: Pure function returning <thead> <tr> row specs array
 */
export const buildHead = ({ inHeaderConfig, inColumns, inTrSpec, inThSpec }) => {
    const localHeaderConfig = inHeaderConfig;
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!Array.isArray(localColumns) || localColumns.length === 0 || !localTrSpec || !localThSpec) {
        return [];
    };
    // console.log("localColumns : ", localColumns);

    const headerRow = buildHeaderRowSpec({
        inHeaderConfig: localHeaderConfig,
        inColumns: localColumns,
        inTrSpec: localTrSpec,
        inThSpec: localThSpec
    });

    return [headerRow];
};

export default buildHead;
