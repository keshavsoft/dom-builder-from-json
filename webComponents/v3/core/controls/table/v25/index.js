import { runRenderPipeline } from "./renderPipeline/index.js";
import buildStory from "./story/index.js";
import domCreationFuncs from "../../../../domCreation/index.js";
import getActiveDomTreeSpecs from "./getActiveDomTreeSpecs.js";

console.log("3-25");

const filterData = ({ inData, inQuery }) => {
    const localData = Array.isArray(inData) ? inData : [];
    const localQuery = (inQuery || "").toLowerCase().trim();

    if (!localQuery) {
        return localData;
    }

    return localData.filter(row =>
        Object.values(row || {}).some(val =>
            String(val ?? "").toLowerCase().includes(localQuery)
        )
    );
};

const hookSearch = ({ inStory, inDomTreeSpecs, inOptions }) => {
    const localStory = inStory;
    const tableSearchInput = document.getElementById("tableSearchInput");

    if (!tableSearchInput) return;

    tableSearchInput.addEventListener("input", (e) => {
        const currentTarget = e.currentTarget;
        const main = currentTarget.closest("#tableContainer");
        const tb = main.querySelector("table tbody");
        const tfoot = main.querySelector("table tfoot");

        const rawData = localStory.store.dataStore.getOriginalData();
        const currentTargetValue = e.currentTarget.value;

        // Step 1: Filter raw data
        const filteredData = filterData({
            inData: rawData,
            inQuery: currentTargetValue
        });

        // Step 2: Update renderer-scoped table store
        // localStory.renderersStore?.table?.store?.dataStore?.setFilteredData({ inData: filteredData });
        localStory.renderersStore?.table?.store?.dataStore?.setStateData({ inData: filteredData });

        const footerConfig = inOptions.renderers.table.footer;
        const localRefreshTable = inStory.refreshTable;

        // const tableSpecInput = localRefreshTable.buildConfiguredTableSpecInput({
        //     inStore: localStory,
        //     inTableConfig: localStory.renderersFromInwardConfig?.table
        // });

        // const newBodyAndFooterRowsSpecs = localRefreshTable.getBodyAndFooterRows({
        //     inDomTreeSpecs,
        //     inColumns: tableSpecInput.inColumns,
        //     inData: tableSpecInput.inData, inHasFooterConfig: true, inFooterConfig: footerConfig
        // });
        console.log("inStory-- : ", inStory);

        // const data = localStory.dataStore.getOriginalData();
        // const columns = .renderersStore.table.store.columnsStore.getColumnsConfig();

        // const steps = localRefreshTable.buildRows({ inColumns: columns, inData: data })

        tb.innerHTML = "";
        // tfoot.innerHTML = "";

        // Step 7: Convert spec to DOM Nodes & repaint!
        const newTbodyNodes = domCreationFuncs.versions[domCreationFuncs.maxVersion](newBodyAndFooterRowsSpecs?.bodyRows);

        if (Array.isArray(newTbodyNodes)) {
            tb.append(...newTbodyNodes);
        } else if (newTbodyNodes) {
            tb.appendChild(newTbodyNodes);
        };

        // const newFooterNodes = domCreationFuncs.versions[domCreationFuncs.maxVersion](newBodyAndFooterRowsSpecs?.footerRows);
        // if (Array.isArray(newFooterNodes)) {
        //     tfoot.append(...newFooterNodes);
        // } else if (newFooterNodes) {
        //     tfoot.appendChild(newFooterNodes);
        // };
    });
};

export const renderTable = (inOptions = {}) => {
    const localOptions = inOptions;
    // console.log("localOptions-----------", localOptions);

    // Resolve theme name from options
    const themeName = localOptions.theme ? localOptions.theme : "light";

    // Map theme classes from getThemeSpecs onto domTreeJsonFiles base specs
    const activeDomTreeSpecs = getActiveDomTreeSpecs({ inThemeName: themeName });

    // Step 1: Build story (pipeline & store)
    const story = buildStory({
        domTreeJsonFiles: activeDomTreeSpecs,
        ...localOptions
    });

    console.log("story---------- : ", story);

    // Step 2: Layer 1b - Execute Render Component Pipeline
    const childrenNodes = runRenderPipeline({
        inPipeline: story.renderPipeline
    });

    console.log("childrenNodes: ", childrenNodes);

    // const localRootSpec = { ...activeDomTreeSpecs.root };

    // localRootSpec.children.push(...childrenNodes);

    const domElement = domCreationFuncs.versions[domCreationFuncs.maxVersion](childrenNodes);

    console.log("domElement: ", domElement[0]);

    const tableContainer = document.getElementById("tableContainer");
    if (tableContainer) {
        tableContainer.appendChild(domElement[0]);
    }

    // hookSearch({
    //     inStory: story,
    //     inDomTreeSpecs: activeDomTreeSpecs,
    //     inOptions: localOptions
    // });

    return domElement;
};

export default renderTable;