/**
 * Executes a pipeline array of render-level DOM task functions sequentially
 */
export const runRenderPipeline = ({ inPipeline = [] }) => {
    const localPipeline = inPipeline;
    let returnArray = [];

    for (const task of localPipeline) {
        const res = task();

        returnArray.push(res);
    };

    return returnArray;
};

export default runRenderPipeline;
