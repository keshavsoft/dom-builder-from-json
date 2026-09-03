import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import {
    initBaseSpecTree,
    transformSpecTreeThroughSteps,
    finalizeSpecTree
} from "./stages/index.js";

import getDataModel from "./dataModel/index.js";

/**
 * Table Task (v8) - Pure 2-Phase Clean Architecture
 *
 * Story:
 * Stage 1. DataModel: Prepares pure typed data model (tHead, tBody, tFoot) - ALL calculations done here
 * Stage 2. Init: Initialize base table skeleton from start.json
 * Stage 3. Transform: Sequentially stamp templates using dataModel ONLY (zero math, zero aggFuncs)
 * Stage 4. Finalize: Normalize & produce the final JSON spec tree via buildSpecElement
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

    // Story Stage 1: Build the complete, pre-calculated Data Model
    const dataModel = getDataModel({
        inColumns: localColumns,
        inData: localData,
        inFooterConfig: localFooterConfig
    });

    // console.log("dataModel : ", dataModel);

    // Story Stage 2: Initialize base table skeleton
    const baseSpecTree = initBaseSpecTree({ inTemplates: localTemplates });

    // Story Stage 3: Transform through sequential steps pipeline using dataModel ONLY
    const populatedSpecTree = transformSpecTreeThroughSteps({
        inSpecTree: baseSpecTree,
        inDataModel: dataModel,
        inTemplates: localTemplates,
        inLogUnfoundKeys: false
    });

    // Story Stage 4: Finalize and normalize output spec
    const finalJson = finalizeSpecTree({ inSpecTree: populatedSpecTree });

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
