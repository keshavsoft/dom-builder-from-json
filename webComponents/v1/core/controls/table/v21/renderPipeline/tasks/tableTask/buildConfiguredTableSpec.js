import buildHead from "./head/index.js";
import buildBody from "./body/index.js";
import buildFooter from "./footer/index.js";

/**
 * Main Orchestrator: Coordinates head, body, and footer modules to build complete table spec
 */
export const buildConfiguredTableSpec = ({
    inDomTreeSpecs,
    inColumns,
    inData,
    inHasFooterConfig,
    inFooterConfig
}) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localData = inData || [];
    const localHasFooterConfig = inHasFooterConfig;
    const localFooterConfig = inFooterConfig;

    // Auto-derive columns from first row if columns not explicitly supplied
    let localColumns = inColumns;
    if ((!Array.isArray(localColumns) || localColumns.length === 0) && localData.length > 0) {
        localColumns = Object.keys(localData[0]);
    }

    const tableSpec = JSON.parse(JSON.stringify(localDomTreeSpecs.tableSpec));

    // 1. Build & attach <thead> section
    buildHead({
        inTableSpec: tableSpec,
        inColumns: localColumns,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec
    });

    // 2. Build & attach <tbody> section
    buildBody({
        inTableSpec: tableSpec,
        inData: localData,
        inColumns: localColumns,
        inTrSpec: localDomTreeSpecs.trSpec,
        inTdSpec: localDomTreeSpecs.tdSpec
    });

    // 3. Build & attach <tfoot> section (only if footer key is present)
    buildFooter({
        inTableSpec: tableSpec,
        inHasFooterConfig: localHasFooterConfig,
        inFooterConfig: localFooterConfig,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec
    });

    return tableSpec;
};

export default buildConfiguredTableSpec;
