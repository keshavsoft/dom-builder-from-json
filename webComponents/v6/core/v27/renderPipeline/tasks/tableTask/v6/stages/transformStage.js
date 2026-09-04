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
 * Stage 2: Transforms base spec tree sequentially through the steps pipeline
 * Follows in -> local parameter naming convention
 */
export const transformSpecTreeThroughSteps = ({
    inSpecTree,
    inColumns,
    inData,
    inTemplates,
    inFooterConfig
}) => {
    const localSpecTree = inSpecTree;
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localFooterConfig = inFooterConfig;

    let currentTree = localSpecTree;
    const stepsList = Array.isArray(stepsDefinition) ? stepsDefinition : Object.values(stepsDefinition);

    console.log("=== [v6: Start Spec Tree] ===", JSON.parse(JSON.stringify(currentTree)));

    let stepIndex = 0;
    for (const step of stepsList) {
        stepIndex++;
        const localBuilder = builderMap[step.builder];

        if (typeof localBuilder !== "function") {
            continue;
        }

        // Conditionally skip footer builder if no footer config is present
        if (step.name === "footer" && (!localFooterConfig || typeof localFooterConfig !== "object" || Object.keys(localFooterConfig).length === 0)) {
            console.log(`=== [v6: Step ${stepIndex} (${step.name})] Skipped (No Footer Config) ===`);
            continue;
        }

        const generatedValue = localBuilder({
            inColumns: localColumns,
            inData: localData,
            inTemplates: localTemplates,
            inFooterConfig: localFooterConfig
        });

        currentTree = applyStepToSpecTree({
            inSpecTree: currentTree,
            inStep: step,
            inValue: generatedValue
        });

        console.log(`=== [v6: Step ${stepIndex} (${step.name})] Output Spec Tree ===`, JSON.parse(JSON.stringify(currentTree)));
    }

    return currentTree;
};

export default transformSpecTreeThroughSteps;
