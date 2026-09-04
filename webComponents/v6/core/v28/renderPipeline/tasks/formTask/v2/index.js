import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import startJson from "./start.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import { createBaseTree, populateTree, buildSpecElement } from "../../common/index.js";
import { builderMap } from "./builders/index.js";
import getDataModel from "./dataModel/index.js";

/**
 * Story:
 * Step 1. Data Model   : Prepares pure typed form fields (key, label, type, placeholder) - (can be precomputed or local)
 * Step 2. Base Tree    : Initializes form skeleton from start.json
 * Step 3. Populate Tree: Transforms tree through steps.json using dataModel
 * Step 4. Finalize     : Normalizes spec tree to DOM element specs via buildSpecElement
 *
 * Follows in -> local parameter naming convention
 */
const buildFormSpecTreeFromDataModel = ({
    inDataModel,
    inTemplates = specTemplatesDictionary,
    inLogUnfoundKeys = false
}) => {
    const localDataModel = inDataModel;
    const localTemplates = inTemplates;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    // Story Step 2: Initialize base form skeleton
    const baseSpecTree = createBaseTree({
        inCompositeDef: startJson,
        inTemplates: localTemplates
    });

    // Story Step 3: Populate spec tree through steps using dataModel
    const populatedSpecTree = populateTree({
        inSpecTree: baseSpecTree,
        inSteps: stepsDefinition,
        inDataModel: localDataModel,
        inBuilderMap: builderMap,
        inTemplates: localTemplates,
        inLogUnfoundKeys: localLogUnfoundKeys
    });

    // Story Step 4: Finalize and normalize output spec
    return buildSpecElement({ inSpec: populatedSpecTree });
};

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

    return buildFormSpecTreeFromDataModel({
        inDataModel: dataModel,
        inTemplates: localTemplates,
        inLogUnfoundKeys: localLogUnfoundKeys
    });
};

const createFormTask = ({
    inColumns,
    inDataModel,
    inLogUnfoundKeys = false
} = {}) => {
    const localColumns = inColumns;
    const localDataModel = inDataModel;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    return ({ inRenderersStore, inDataModels } = {}) => {
        const resolvedDataModel = inDataModels?.form || localDataModel;

        if (resolvedDataModel) {
            return buildFormSpecTreeFromDataModel({
                inDataModel: resolvedDataModel,
                inLogUnfoundKeys: localLogUnfoundKeys
            });
        }

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
    buildFormSpecTreeFromDataModel,
    buildFormSpecTreeFromColumns
};

export default createFormTask;
