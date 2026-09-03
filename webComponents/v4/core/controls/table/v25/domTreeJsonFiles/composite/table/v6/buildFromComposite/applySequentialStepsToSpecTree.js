import applySingleStepToSpecTree from "./applySingleStepToSpecTree.js";

export const applySequentialStepsToSpecTree = ({ inSpecTree, inStepsDef, inTemplates, inEnableLog = true }) => {
    const localSpecTree = inSpecTree;
    const localStepsDef = inStepsDef;
    const localTemplates = inTemplates;
    const localEnableLog = inEnableLog;

    if (!localSpecTree || !localStepsDef || !localTemplates) {
        return localSpecTree;
    }

    const stepsList = Array.isArray(localStepsDef) ? localStepsDef : [localStepsDef];

    return stepsList.reduce((currentSpecTree, stepDefinition, stepIndex) => {
        const stepNumber = stepIndex + 1;
        if (localEnableLog) {
            console.log(`\n--- [Step ${stepNumber}] Transformation: ${JSON.stringify(stepDefinition)} ---`);
        }

        const updatedSpecTree = applySingleStepToSpecTree({
            inSpecTree: currentSpecTree,
            inStepDef: stepDefinition,
            inTemplates: localTemplates
        });

        if (localEnableLog) {
            console.log(`[Step ${stepNumber} Output Children] :`, JSON.stringify(updatedSpecTree.children, null, 2));
        }

        return updatedSpecTree;
    }, localSpecTree);
};

export default applySequentialStepsToSpecTree;
