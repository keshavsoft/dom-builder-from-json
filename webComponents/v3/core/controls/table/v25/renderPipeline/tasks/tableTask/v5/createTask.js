import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };
import stepsDefinitionList from "./steps.json" with { type: "json" };

import buildBaseSpecTreeFromComposite, {
    applySequentialStepsToSpecTree
} from "./buildFromComposite.js";

import buildStepsFromDefinition from "./buildStepsFromDefinition.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildTableSpecTreeFromColumnsAndData = ({
    inColumns,
    inData
}) => {
    const localColumns = inColumns;
    const localData = inData;

    const baseTreeCopy = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );

    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinitionList,
        inColumns: localColumns,
        inData: localData
    });

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: specTemplatesDictionary,
        inEnableLog: false
    });
};

/**
 * Render Task Transformer:
 * Creates the complete table specification tree.
 */
export const createTableTask = ({
    inColumns,
    inData
} = {}) => {
    const localColumns = inColumns;
    const localData = inData;

    return () => {
        return buildTableSpecTreeFromColumnsAndData({
            inColumns: localColumns,
            inData: localData
        });
    };
};

export {
    buildTableSpecTreeFromColumnsAndData,
    initialBaseSpecTree
};

export default createTableTask;