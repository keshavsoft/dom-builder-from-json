import tasksDefinitions from "./tasks.json" with { type: "json" };
import { runSpecTreeTask } from "./common/runSpecTreeTask.js";
import { universalBuilderMap } from "./common/universalBuilders.js";

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

/**
 * Builds task factories dynamically from an incoming task definitions JSON object
 * Follows in -> local parameter naming convention
 */
const buildTasks = ({
    inTasksDefinitions = tasksDefinitions,
    inBuilderMap = universalBuilderMap
} = {}) => {
    const localTasksDefinitions = inTasksDefinitions || tasksDefinitions;
    const localBuilderMap = inBuilderMap || universalBuilderMap;

    const taskRegistry = {};

    for (const [taskName, taskDef] of Object.entries(localTasksDefinitions)) {
        const dataModelKey = taskName.replace(/Task$/, "");

        taskRegistry[taskName] = ({ inDataModel, inShowSearch } = {}) => {
            const localDataModel = inDataModel;
            const localShowSearch = inShowSearch;

            if (dataModelKey === "search" && localShowSearch === false) {
                return () => null;
            }

            return createGenericSpecTask({
                inStartDef: taskDef.start,
                inSteps: taskDef.steps || [],
                inDataModelKey: dataModelKey,
                inDataModel: localDataModel,
                inBuilderMap: localBuilderMap
            });
        };
    }

    return taskRegistry;
};

// Instantiate task registry from tasks.json definitions
const tasks = buildTasks({ inTasksDefinitions: tasksDefinitions });

export const createSearchTask = tasks.searchTask;
export const createTableTask = tasks.tableTask;
export const createFormTask = tasks.formTask;

export {
    tasks,
    buildTasks,
    createGenericSpecTask
};

export default tasks;
