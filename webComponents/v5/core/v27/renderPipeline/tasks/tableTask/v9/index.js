import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import getDataModel from "./dataModel/index.js";
import { createBaseTree, populateTree } from "./stepRunner.js";
import { buildSpecElement } from "./build/buildSpecElement.js";

/**
 * Table Task (v9) - Story Orchestrator
 *
 * Story:
 * Step 1. Data Model   : Prepares pure typed data model (tHead, tBody, tFoot) - all math done here
 * Step 2. Base Tree    : Initializes table skeleton from start.json
 * Step 3. Populate Tree: Transforms tree sequentially through steps.json using dataModel
 * Step 4. Finalize     : Normalizes spec tree to DOM element specs via buildSpecElement
 *
 * Follows in -> local parameter naming convention
 */
const buildTableSpecTreeFromColumnsAndData = ({
    inColumns,
    inData,
    inTemplates = specTemplatesDictionary,
    inFooterConfig,
    inLogUnfoundKeys = false
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localFooterConfig = inFooterConfig;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    // Story Step 1: Prepare pure typed data model
    const dataModel = getDataModel({
        inColumns: localColumns,
        inData: localData,
        inFooterConfig: localFooterConfig
    });

    // Story Step 2: Initialize base table skeleton
    const baseSpecTree = createBaseTree({
        inTemplates: localTemplates
    });

    // Story Step 3: Populate spec tree through steps using dataModel
    const populatedSpecTree = populateTree({
        inSpecTree: baseSpecTree,
        inDataModel: dataModel,
        inTemplates: localTemplates,
        inLogUnfoundKeys: localLogUnfoundKeys
    });

    // Story Step 4: Finalize and normalize output spec
    return buildSpecElement({ inSpec: populatedSpecTree });
};

const createTableTask = ({
    inColumns,
    inData,
    inFooterConfig,
    inLogUnfoundKeys = false
} = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localFooterConfig = inFooterConfig;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    return ({ inRenderersStore } = {}) => {
        return buildTableSpecTreeFromColumnsAndData({
            inColumns: localColumns,
            inData: localData,
            inFooterConfig: localFooterConfig,
            inLogUnfoundKeys: localLogUnfoundKeys
        });
    };
};

export {
    createTableTask
};

export default createTableTask;
