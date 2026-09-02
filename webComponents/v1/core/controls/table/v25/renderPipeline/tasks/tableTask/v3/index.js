import { getHeadRows, getBodyRows, getFooterRows } from "./buildConfiguredTableSpec/index.js";
import buildConfiguredTableSpecInput from "./buildConfiguredTableSpecInput/index.js";

/**
 * Render Task Transformer: Creates and appends the <table> DOM element skeleton during rendering
 */
export const createTableTask = ({
    inShowTable = true,
    inDomTreeSpecs,
    inStore,
    inTableConfig
} = {}) => {
    const localShowTable = inShowTable !== false;
    const localDomTreeSpecs = inDomTreeSpecs;
    const localStore = inStore;
    const localTableConfig = inTableConfig;

    return () => {
        if (!localShowTable) {
            return null;
        }

        const tableSpecInput = buildConfiguredTableSpecInput({
            inStore: localStore,
            inTableConfig: localTableConfig
        });

        // Step 1: Build <thead> section element
        const headRows = getHeadRows({
            inDomTreeSpecs: localDomTreeSpecs,
            inColumns: tableSpecInput.inColumns
        });

        // Step 2: Build <tbody> section element
        const bodyRows = getBodyRows({
            inDomTreeSpecs: localDomTreeSpecs,
            inData: tableSpecInput.inData
        });

        // Step 3: Build <tfoot> section element
        const footerRows = getFooterRows({ inDomTreeSpecs, ...tableSpecInput });
        const tableSpec = JSON.parse(JSON.stringify(localDomTreeSpecs.tableSpec));

        const headRow = tableSpec.children?.find(child => child.tagName === "thead") || { tagName: "thead", children: [] }

        headRow.children = headRows;

        const bodyRow = tableSpec.children?.find(child => child.tagName === "tbody") || { tagName: "tbody", children: [] }

        bodyRow.children = bodyRows;

        const footerRow = tableSpec.children?.find(child => child.tagName === "tfoot") || { tagName: "tfoot", children: [] }

        footerRow.children = footerRows;

        return tableSpec;
    };
};

export default createTableTask;


