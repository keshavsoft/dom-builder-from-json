import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import startJson from "./start.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import { buildBaseSpecTreeFromComposite, findTargetNodeByPathParts } from "../../common/index.js";
import { builderMap } from "./builders/index.js";

const applyStepToSpecTree = ({ inSpecTree, inStep, inValue }) => {
    const localSpecTree = inSpecTree;
    const localStep = inStep;
    const localValue = inValue;

    if (!localStep?.find || !localStep?.target) {
        return localSpecTree;
    }

    const pathParts = localStep.find.split(".");
    const targetNode = findTargetNodeByPathParts({
        inNode: localSpecTree,
        inPathParts: pathParts
    });

    if (targetNode) {
        if (localStep.target === "children") {
            targetNode.children = Array.isArray(localValue) ? localValue : [localValue].filter(Boolean);
        } else {
            targetNode[localStep.target] = localValue;
        }
    }

    return localSpecTree;
};

/**
 * Initializes the base form skeleton from start.json
 * Follows in -> local parameter naming convention
 */
export const createBaseTree = ({ inTemplates = specTemplatesDictionary } = {}) => {
    const localTemplates = inTemplates;

    return buildBaseSpecTreeFromComposite({
        inCompositeDef: startJson,
        inTemplates: localTemplates
    });
};

/**
 * Populates base spec tree through sequential steps using dataModel ONLY
 * Contains composite guard: only processes if composite key exists in inTemplates.composite
 * Follows in -> local parameter naming convention
 */
export const populateTree = ({
    inSpecTree,
    inDataModel,
    inTemplates,
    inLogUnfoundKeys = false
}) => {
    const localSpecTree = inSpecTree;
    const localDataModel = inDataModel;
    const localTemplates = inTemplates;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    let currentTree = localSpecTree;
    const stepsList = Array.isArray(stepsDefinition) ? stepsDefinition : Object.values(stepsDefinition || {});
    const availableCompositeKeys = localTemplates?.composite ? Object.keys(localTemplates.composite) : [];

    let stepIndex = 0;
    for (const step of stepsList) {
        stepIndex++;

        // Identify requested composite key (from composite or builder property)
        const requestedCompositeKey = step.composite || step.builder;

        // GUARD: Only present in templates.composite then only process
        const isPresentInComposite = Boolean(
            localTemplates?.composite &&
            requestedCompositeKey &&
            requestedCompositeKey in localTemplates.composite
        );

        if (!isPresentInComposite) {
            if (localLogUnfoundKeys) {
                console.warn(
                    `[Composite Guard] Step ${stepIndex} ("${step.name}") requested composite key "${requestedCompositeKey}", which was NOT found in inTemplates.composite!`,
                    `Available keys are:`,
                    availableCompositeKeys
                );
            }
            continue;
        }

        const localBuilder = builderMap[step.builder] || builderMap[requestedCompositeKey];
        if (typeof localBuilder !== "function") {
            continue;
        }

        const generatedValue = localBuilder({
            inDataModel: localDataModel,
            inTemplates: localTemplates
        });

        currentTree = applyStepToSpecTree({
            inSpecTree: currentTree,
            inStep: step,
            inValue: generatedValue
        });
    }

    return currentTree;
};

export default {
    createBaseTree,
    populateTree
};
