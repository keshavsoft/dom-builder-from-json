import buildHead from "./head/index.js";
import buildBody from "./body/index.js";
import buildFooter from "./footer/v4/index.js";

/**
 * Builds the complete <thead> spec node populated with head row/cell specs.
 */
export const getHeadRows = ({ inDomTreeSpecs, inColumns }) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localColumns = inColumns || [];

    const headRows = buildHead({
        inColumns: localColumns,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec
    });

    return headRows;
};

/**
 * Builds the complete <tbody> spec node populated with body row/cell specs.
 */
export const getBodyRows = ({ inDomTreeSpecs, inData }) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localData = inData || [];

    const bodyRows = buildBody({
        inData: localData,
        inTrSpec: localDomTreeSpecs.trSpec,
        inTdSpec: localDomTreeSpecs.tdSpec
    });

    return bodyRows;
};

export const getBodyAndFooterRows = ({ inDomTreeSpecs,
    inColumns,
    inData,
    inHasFooterConfig,
    inFooterConfig
}) => {

    const bodyRows = getBodyRows({ inDomTreeSpecs, inData });
    // debugger
    const footerRows = getFooterRows({
        inDomTreeSpecs,
        inColumns,
        inData,
        inHasFooterConfig,
        inFooterConfig
    });

    return { bodyRows, footerRows };
};

/**
 * Builds the complete <tfoot> spec node populated with footer row/cell specs.
 */
export const getFooterRows = ({
    inDomTreeSpecs,
    inColumns,
    inData,
    inHasFooterConfig,
    inFooterConfig
}) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localHasFooterConfig = inHasFooterConfig;
    const localFooterConfig = inFooterConfig;

    if (!localHasFooterConfig) {
        return null;
    }

    const footerRows = buildFooter({
        inHasFooterConfig: localHasFooterConfig,
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec,
        inInputSpec: localDomTreeSpecs.inputSpec
    });

    return footerRows;
};

/**
 * Main Orchestrator: Combines head, body, and footer section nodes into tableSpec.
 */
export const buildConfiguredTableSpec = ({
    inDomTreeSpecs,
    inColumns,
    inData,
    inHasFooterConfig,
    inFooterConfig
}) => {
    const localDomTreeSpecs = inDomTreeSpecs;
    const localColumns = inColumns || [];
    const localData = inData || [];
    const localHasFooterConfig = inHasFooterConfig;
    const localFooterConfig = inFooterConfig;

    const tableSpec = JSON.parse(JSON.stringify(localDomTreeSpecs.tableSpec));

    const headNode = getHead({
        inDomTreeSpecs: localDomTreeSpecs,
        inColumns: localColumns
    });

    const bodyNode = getBody({
        inDomTreeSpecs: localDomTreeSpecs,
        inData: localData
    });

    const footerNode = getFooter({
        inDomTreeSpecs: localDomTreeSpecs,
        inColumns: localColumns,
        inData: localData,
        inHasFooterConfig: localHasFooterConfig,
        inFooterConfig: localFooterConfig
    });

    tableSpec.children = [headNode, bodyNode, footerNode].filter(Boolean);

    return tableSpec;
};

export default buildConfiguredTableSpec;

