import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import {
    initBaseSpecTree,
    transformSpecTreeThroughSteps,
    finalizeSpecTree
} from "./stages/index.js";

/**
 * Table Task (v6) - Clean 3-Stage Story Orchestrator
 *
 * Story:
 * Stage 1. Init: Initialize base spec tree skeleton from start.json
 * Stage 2. Transform: Sequentially apply pipeline steps (header -> body -> footer)
 * Stage 3. Finalize: Normalize & produce the final JSON spec tree via buildSpecElement
 *
 * Follows in -> local parameter naming convention
 */
const buildTableSpecTreeFromColumnsAndData = ({
    inColumns,
    inData,
    inTemplates = specTemplatesDictionary,
    inFooterConfig
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localFooterConfig = inFooterConfig;

    // Story Stage 1: Initialize base table skeleton
    const baseSpecTree = initBaseSpecTree({ inTemplates: localTemplates });

    // Story Stage 2: Transform through sequential steps pipeline
    const populatedSpecTree = transformSpecTreeThroughSteps({
        inSpecTree: baseSpecTree,
        inColumns: localColumns,
        inData: localData,
        inTemplates: localTemplates,
        inFooterConfig: localFooterConfig
    });

    // Story Stage 3: Finalize and normalize output spec
    return finalizeSpecTree({ inSpecTree: populatedSpecTree });
};

const createTableTask = ({
    inColumns,
    inData,
    inFooterConfig
} = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localFooterConfig = inFooterConfig;

    return ({ inRenderersStore } = {}) => {
        return buildTableSpecTreeFromColumnsAndData({
            inColumns: localColumns,
            inData: localData,
            inFooterConfig: localFooterConfig
        });
    };
};

export {
    createTableTask
};

export default createTableTask;
