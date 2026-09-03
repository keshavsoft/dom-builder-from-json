import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import startJson from "./start.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };
import { buildSpecElement } from "./build/buildSpecElement.js";
import { findTargetNodeByPathParts, buildBaseSpecTreeFromComposite } from "../../common/index.js";
import { builderMap } from "./builders/index.js";
import getDataModel from "./dataModel/index.js";

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
 * Table Task (v8) - Self-contained, single-orchestrator architecture
 *
 * Execution:
 * 1. Data Model: Prepares pure typed data model (tHead, tBody, tFoot) - all math done here
 * 2. Skeleton: Builds base spec tree from start.json using buildBaseSpecTreeFromComposite
 * 3. Transform: Iterates over steps.json, guards against composite keys, and stamps templates
 * 4. Finalize: Normalizes spec tree via buildSpecElement
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

    // 1. Build the complete, pre-calculated Data Model
    const dataModel = getDataModel({
        inColumns: localColumns,
        inData: localData,
        inFooterConfig: localFooterConfig
    });

    // 2. Initialize base table skeleton from start.json
    let currentTree = buildBaseSpecTreeFromComposite({
        inCompositeDef: startJson,
        inTemplates: localTemplates
    });
    const availableCompositeKeys = localTemplates?.composite ? Object.keys(localTemplates.composite) : [];

    // 3. Transform through sequential steps pipeline using dataModel ONLY
    for (const step of stepsDefinition) {
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
                    `[Composite Guard] Step "${step.name}" requested composite key "${requestedCompositeKey}", which was NOT found in inTemplates.composite!`,
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

        // Skip footer if dataModel has no footer rows
        if ((step.name === "footer" || step.name === "tFoot") && (!dataModel?.tFoot || dataModel.tFoot.length === 0)) {
            continue;
        }

        const generatedValue = localBuilder({
            inDataModel: dataModel,
            inTemplates: localTemplates
        });

        currentTree = applyStepToSpecTree({
            inSpecTree: currentTree,
            inStep: step,
            inValue: generatedValue
        });
    }

    // 4. Finalize and normalize output spec
    return buildSpecElement({ inSpec: currentTree });
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
