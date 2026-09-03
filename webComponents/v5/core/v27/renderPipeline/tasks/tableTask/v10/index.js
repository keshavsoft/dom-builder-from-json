import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import startJson from "./start.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import { createBaseTree, populateTree, buildSpecElement } from "../../common/index.js";
import { builderMap } from "./builders/index.js";
import getDataModel from "./dataModel/index.js";

/**
 * Table Task (v10) - Shared Universal Engine Consumer
 *
 * Story:
 * Step 1. Data Model   : Prepares pure typed data model (tHead, tBody, tFoot)
 * Step 2. Base Tree    : Initializes table skeleton from start.json
 * Step 3. Populate Tree: Transforms tree through steps.json using dataModel
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
        inCompositeDef: startJson,
        inTemplates: localTemplates
    });

    // Story Step 3: Populate spec tree through steps using dataModel
    const populatedSpecTree = populateTree({
        inSpecTree: baseSpecTree,
        inSteps: stepsDefinition,
        inDataModel: dataModel,
        inBuilderMap: builderMap,
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
