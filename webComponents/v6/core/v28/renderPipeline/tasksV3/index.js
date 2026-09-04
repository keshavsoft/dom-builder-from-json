import { runSpecTreeTask } from "./common/runSpecTreeTask.js";
import { universalBuilderMap } from "./common/universalBuilders.js";
import createSearchTask from "./searchTask/index.js";

import tableStartJson from "./tableTask/start.json" with { type: "json" };
import tableStepsJson from "./tableTask/steps.json" with { type: "json" };

import formStartJson from "./formTask/start.json" with { type: "json" };
import formStepsJson from "./formTask/steps.json" with { type: "json" };

/**
 * Generic Spec Task Creator
 * Runs pure JSON definition through common universal spec tree engine
 * Follows in -> local parameter naming convention
 */
const createGenericSpecTask = ({
    inStartDef,
    inSteps,
    inDataModelKey,
    inDataModel,
    inBuilderMap = universalBuilderMap
} = {}) => {
    const localStartDef = inStartDef;
    const localSteps = inSteps;
    const localKey = inDataModelKey;
    const localDataModel = inDataModel;
    const localBuilderMap = inBuilderMap;

    return ({ inDataModels } = {}) => {
        const resolvedDataModel = inDataModels?.[localKey] || localDataModel;

        return runSpecTreeTask({
            inStartDef: localStartDef,
            inSteps: localSteps,
            inBuilderMap: localBuilderMap,
            inDataModel: resolvedDataModel
        });
    };
};

export const createTableTask = ({ inDataModel } = {}) => {
    return createGenericSpecTask({
        inStartDef: tableStartJson,
        inSteps: tableStepsJson,
        inDataModelKey: "table",
        inDataModel
    });
};

export const createFormTask = ({ inDataModel } = {}) => {
    return createGenericSpecTask({
        inStartDef: formStartJson,
        inSteps: formStepsJson,
        inDataModelKey: "form",
        inDataModel
    });
};

export {
    createSearchTask,
    createGenericSpecTask
};

export default {
    createSearchTask,
    createTableTask,
    createFormTask,
    createGenericSpecTask
};
