import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import {
    initBaseSpecTree,
    transformSpecTreeThroughSteps,
    finalizeSpecTree
} from "./stages/index.js";

import getDataModel from "./dataModel/index.js";

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

    const dataModel = getDataModel({
        inColumns: localColumns,
        inData: localData,
        inFooterConfig: localFooterConfig
    });

    console.log("dataModel : ", dataModel);

    // Story Stage 1: Initialize base table skeleton
    const baseSpecTree = initBaseSpecTree({ inTemplates: localTemplates });
    // debugger

    // console.log("localColumns : ", localColumns);

    // Story Stage 2: Transform through sequential steps pipeline
    const populatedSpecTree = transformSpecTreeThroughSteps({
        inSpecTree: baseSpecTree,
        inColumns: localColumns,
        inData: localData,
        inTemplates: localTemplates,
        inFooterConfig: localFooterConfig
    });

    const finalJson = finalizeSpecTree({ inSpecTree: populatedSpecTree });
    // console.log("finalJson : ", finalJson);

    // Story Stage 3: Finalize and normalize output spec
    return finalJson;
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
