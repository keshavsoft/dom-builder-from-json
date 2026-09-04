/**
 * Executes a pipeline array of render-level DOM task functions sequentially
 */
export const runRenderPipeline = ({ inPipeline = [], inRenderersStore, inDataModels }) => {
    const localPipeline = inPipeline;
    const localRenderersStore = inRenderersStore;
    const localDataModels = inDataModels;
    let returnArray = [];

    for (const task of localPipeline) {
        const res = task({
            inRenderersStore: localRenderersStore,
            inDataModels: localDataModels
        });

        returnArray.push(res);
    };
    // console.log("returnArray ----: ", returnArray);

    return returnArray;
};

export default runRenderPipeline;
