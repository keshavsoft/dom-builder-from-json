import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import startJson from "./start.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import { createBaseTree, populateTree, buildSpecElement } from "../../common/index.js";
import { builderMap } from "./builders/index.js";
import getDataModel from "./dataModel/index.js";

/**
 * Form Task (v2) - Shared Universal Engine Consumer
 *
 * Story:
 * Step 1. Data Model   : Prepares pure typed form fields (key, label, type, placeholder)
 * Step 2. Base Tree    : Initializes form skeleton from start.json
 * Step 3. Populate Tree: Transforms tree through steps.json using dataModel
 * Step 4. Finalize     : Normalizes spec tree to DOM element specs via buildSpecElement
 *
 * Follows in -> local parameter naming convention
 */
const buildFormSpecTreeFromColumns = ({
    inColumns,
    inTemplates = specTemplatesDictionary,
    inLogUnfoundKeys = false
}) => {
    const localColumns = inColumns;
    const localTemplates = inTemplates;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    // Story Step 1: Prepare pure form data model
    const dataModel = getDataModel({
        inColumns: localColumns
    });

    // Story Step 2: Initialize base form skeleton
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

const createFormTask = ({
    inColumns,
    inLogUnfoundKeys = false
} = {}) => {
    const localColumns = inColumns;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    return ({ inRenderersStore } = {}) => {
        const localFormStore = inRenderersStore?.form?.store;
        const formColumns = localFormStore?.columnsStore?.getColumnsConfig();

        return buildFormSpecTreeFromColumns({
            inColumns: formColumns || localColumns,
            inLogUnfoundKeys: localLogUnfoundKeys
        });
    };
};

export {
    createFormTask,
    buildFormSpecTreeFromColumns
};

export default createFormTask;
