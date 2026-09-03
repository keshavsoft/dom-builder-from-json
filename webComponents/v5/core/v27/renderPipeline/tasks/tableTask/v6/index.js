import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };

import {
    buildBaseSpecTreeFromComposite,
    findTargetNodeByPathParts
} from "../../common/index.js";

import { builderMap } from "./builders/index.js";
import { buildSpecElement } from "./build/buildSpecElement.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

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

const buildTableSpecTreeFromColumnsAndData = ({
    inColumns,
    inData,
    inTemplates = specTemplatesDictionary,
    inFooterConfig
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localFooterConfig = inFooterConfig;

    let currentSpecTree = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );

    console.log("=== [v5: Start Spec Tree] ===", JSON.parse(JSON.stringify(currentSpecTree)));

    const stepsList = Array.isArray(stepsDefinition) ? stepsDefinition : Object.values(stepsDefinition);

    let stepIndex = 0;
    for (const step of stepsList) {
        stepIndex++;
        const localBuilder = builderMap[step.builder];

        if (typeof localBuilder !== "function") {
            continue;
        }

        // Conditionally skip footer builder if no footer config is present
        if (step.name === "footer" && (!localFooterConfig || typeof localFooterConfig !== "object" || Object.keys(localFooterConfig).length === 0)) {
            console.log(`=== [v5: Step ${stepIndex} (${step.name})] Skipped (No Footer Config) ===`);
            continue;
        }

        const generatedValue = localBuilder({
            inColumns: localColumns,
            inData: localData,
            inTemplates: localTemplates,
            inFooterConfig: localFooterConfig
        });

        currentSpecTree = applyStepToSpecTree({
            inSpecTree: currentSpecTree,
            inStep: step,
            inValue: generatedValue
        });

        console.log(`=== [v5: Step ${stepIndex} (${step.name})] Output Spec Tree ===`, JSON.parse(JSON.stringify(currentSpecTree)));
    }

    // Connect pulled & tweaked buildSpecElement from v5/build
    const finalSpecTree = buildSpecElement({ inSpec: currentSpecTree });
    console.log("=== [v5: Final Spec Tree after buildSpecElement] ===", JSON.parse(JSON.stringify(finalSpecTree)));

    return finalSpecTree;
};

const createTableTask = ({
    inColumns,
    inData,
    inFooterConfig
} = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localFooterConfig = inFooterConfig;

    return ({ inRenderersStore } = {}) => {
        const localRenderersStore = inRenderersStore;

        return buildTableSpecTreeFromColumnsAndData({
            inColumns: localColumns,
            inData: localData,
            inFooterConfig: localFooterConfig
        });
    };
};

export {
    createTableTask
};

export default createTableTask;
