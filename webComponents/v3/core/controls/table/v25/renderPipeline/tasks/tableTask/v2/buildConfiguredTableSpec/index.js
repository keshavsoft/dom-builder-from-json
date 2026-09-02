import buildHead from "./head/index.js";
import buildBody from "./body/index.js";
import buildFooter from "./footer/v4/index.js";

/**
 * Main Orchestrator: Purely resolves row specs from head, body, and footer modules
 * and hooks them into tableSpec section nodes.
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

    // 1. Build pure row specs for head, body, and footer
    const headRows = buildHead({
        inColumns: localColumns,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec
    });

    const bodyRows = buildBody({
        inData: localData,
        inTrSpec: localDomTreeSpecs.trSpec,
        inTdSpec: localDomTreeSpecs.tdSpec
    });

    const footerRows = buildFooter({
        inHasFooterConfig: localHasFooterConfig,
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData,
        inTrSpec: localDomTreeSpecs.trSpec,
        inThSpec: localDomTreeSpecs.thSpec,
        inInputSpec: localDomTreeSpecs.inputSpec
    });

    // 2. Hook row specs into tableSpec section nodes
    if (Array.isArray(headRows) && headRows.length > 0) {
        const theadNode = tableSpec.children?.find(child => child.tagName === "thead");
        if (theadNode) {
            theadNode.children = headRows;
        }
    }

    if (Array.isArray(bodyRows) && bodyRows.length > 0) {
        const tbodyNode = tableSpec.children?.find(child => child.tagName === "tbody");
        if (tbodyNode) {
            tbodyNode.children = bodyRows;
        }
    }

    if (!localHasFooterConfig) {
        if (Array.isArray(tableSpec.children)) {
            tableSpec.children = tableSpec.children.filter(child => child.tagName !== "tfoot");
        }
    } else if (Array.isArray(footerRows) && footerRows.length > 0) {
        const tfootNode = tableSpec.children?.find(child => child.tagName === "tfoot");
        if (tfootNode) {
            tfootNode.children = footerRows;
        }
    }

    return tableSpec;
};

export default buildConfiguredTableSpec;
