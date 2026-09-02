import { runRenderPipeline } from "./renderPipeline/index.js";
import buildStory from "./story/index.js";
import domCreationFuncs from "../../../../domCreation/index.js";
import getActiveDomTreeSpecs from "./getActiveDomTreeSpecs.js";

console.log("23");

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

const hookSearch = ({ inStory }) => {
    const localStory = inStory;
    const tableSearchInput = document.getElementById("tableSearchInput");

    if (!tableSearchInput) return;

    tableSearchInput.addEventListener("input", (e) => {
        const rawData = localStory.store.dataStore.getOriginalData();
        const currentTargetValue = e.currentTarget.value;

        const filteredData = filterData({
            inData: rawData,
            inQuery: currentTargetValue
        });

        // Set filtered data inside renderer-scoped table store!
        localStory.renderersStore?.table?.store?.dataStore?.setFilteredData({ inData: filteredData });

        console.log("currentTargetValue : ", currentTargetValue);
        console.log("root store originalData : ", rawData);
        console.log("renderersStore table filteredData : ", localStory.renderersStore?.table?.store?.dataStore?.getFilteredData());
    });
};

export const renderTable = (inOptions = {}) => {
    const localOptions = inOptions;

    // Resolve theme name from options
    const themeName = localOptions.theme ? localOptions.theme : "light";

    // Map theme classes from getThemeSpecs onto domTreeJsonFiles base specs
    const activeDomTreeSpecs = getActiveDomTreeSpecs({ inThemeName: themeName });

    // Step 1: Build story (pipeline & store)
    const story = buildStory({
        domTreeJsonFiles: activeDomTreeSpecs,
        ...localOptions
    });

    console.log("story : ", story);

    // Step 2: Layer 1b - Execute Render Component Pipeline
    const childrenNodes = runRenderPipeline({
        inPipeline: story.renderPipeline
    });

    const localRootSpec = { ...activeDomTreeSpecs.root };

    localRootSpec.children.push(...childrenNodes);

    const domElement = domCreationFuncs.versions[domCreationFuncs.maxVersion](localRootSpec);

    const tableContainer = document.getElementById("tableContainer");
    if (tableContainer) {
        tableContainer.appendChild(domElement);
    }

    hookSearch({ inStory: story });

    return domElement;
};

export default renderTable;