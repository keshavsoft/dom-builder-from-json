/**
 * Executes a pipeline array of render-level DOM task functions sequentially
 */
export const runRenderPipeline = ({ inPipeline = [], inRenderersStore }) => {
    const localPipeline = inPipeline;
    let returnArray = [];

    for (const task of localPipeline) {
        const res = task({ inRenderersStore });

        returnArray.push(res);
    };
    // console.log("returnArray ----: ", returnArray);

    return returnArray;
};

export default runRenderPipeline;
