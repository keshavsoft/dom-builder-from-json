/**
 * Executes a pipeline array of render-level DOM task functions sequentially
 */
export const runRenderPipeline = ({ inPipeline = [], inRenderersStore, inCollections, inDataModels }) => {
    const localPipeline = inPipeline;
    const localRenderersStore = inRenderersStore;
    const localCollections = inCollections;
    const localDataModels = inDataModels;
    let returnArray = [];

    for (const task of localPipeline) {
        const res = task({
            inRenderersStore: localRenderersStore,
            inCollections: localCollections,
            inDataModels: localDataModels
        });

        returnArray.push(res);
    };
    // console.log("returnArray ----: ", returnArray);

    return returnArray;
};

export default runRenderPipeline;
