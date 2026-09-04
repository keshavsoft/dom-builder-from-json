import specTemplatesDictionary from "../../../../../specs/v2/spec.json" with { type: "json" };
import { buildBaseSpecTreeFromComposite, findTargetNodeByPathParts } from "./specTreeEngine.js";

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
 * Universal base tree initializer from a composite skeleton JSON
 * Follows in -> local parameter naming convention
 */
export const createBaseTree = ({ inCompositeDef, inTemplates = specTemplatesDictionary } = {}) => {
    const localCompositeDef = inCompositeDef;
    const localTemplates = inTemplates;

    return buildBaseSpecTreeFromComposite({
        inCompositeDef: localCompositeDef,
        inTemplates: localTemplates
    });
};

/**
 * Universal step populator:
 * Iterates through steps, guards against spec.json composite, calls builder with dataModel, and updates tree
 * Follows in -> local parameter naming convention
 */
export const populateTree = ({
    inSpecTree,
    inSteps,
    inDataModel,
    inBuilderMap,
    inTemplates = specTemplatesDictionary,
    inLogUnfoundKeys = false
}) => {
    const localSpecTree = inSpecTree;
    const localSteps = inSteps;
    const localDataModel = inDataModel;
    const localBuilderMap = inBuilderMap;
    const localTemplates = inTemplates;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    let currentTree = localSpecTree;
    const stepsList = Array.isArray(localSteps) ? localSteps : Object.values(localSteps || {});
    const availableCompositeKeys = localTemplates?.composite ? Object.keys(localTemplates.composite) : [];

    let stepIndex = 0;
    for (const step of stepsList) {
        stepIndex++;

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

        const localBuilder = localBuilderMap?.[step.builder] || localBuilderMap?.[requestedCompositeKey];
        if (typeof localBuilder !== "function") {
            continue;
        }

        // Optional skip check for empty collections (e.g. footer with no rows)
        if ((step.name === "footer" || step.name === "tFoot") && (!localDataModel?.tFoot || localDataModel.tFoot.length === 0)) {
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
    populateTree,
    applyStepToSpecTree
};
