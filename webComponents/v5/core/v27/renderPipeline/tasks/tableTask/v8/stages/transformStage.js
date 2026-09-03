import stepsDefinition from "../steps.json" with { type: "json" };
import { findTargetNodeByPathParts } from "../../../common/index.js";
import { builderMap } from "../builders/index.js";

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
 * Stage 2: Transforms base spec tree sequentially through the steps pipeline using dataModel ONLY
 * Zero calculations, zero math - pure template stamping
 * Follows in -> local parameter naming convention
 */
export const transformSpecTreeThroughSteps = ({
    inSpecTree,
    inDataModel,
    inTemplates
}) => {
    const localSpecTree = inSpecTree;
    const localDataModel = inDataModel;
    const localTemplates = inTemplates;

    let currentTree = localSpecTree;
    const stepsList = Array.isArray(stepsDefinition) ? stepsDefinition : Object.values(stepsDefinition);

    console.log("=== [v8: Start Spec Tree] ===", JSON.parse(JSON.stringify(currentTree)));

    let stepIndex = 0;
    for (const step of stepsList) {
        stepIndex++;
        const localBuilder = builderMap[step.builder];

        if (typeof localBuilder !== "function") {
            continue;
        }

        // Skip footer if dataModel has no footer rows
        if (step.name === "footer" && (!localDataModel?.tFoot || localDataModel.tFoot.length === 0)) {
            console.log(`=== [v8: Step ${stepIndex} (${step.name})] Skipped (No Footer in dataModel) ===`);
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

        console.log(`=== [v8: Step ${stepIndex} (${step.name})] Output Spec Tree ===`, JSON.parse(JSON.stringify(currentTree)));
    }

    return currentTree;
};

export default transformSpecTreeThroughSteps;
