import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };

import buildBaseSpecTreeFromComposite, { applySequentialStepsToSpecTree } from "./buildFromComposite.js";
import buildStepsFromColumnsAndData from "./buildStepsFromColumnsAndData.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildTableSpecTreeFromColumnsAndData = ({ inColumns, inData }) => {
    const localColumns = inColumns;
    const localData = inData;

    const baseTreeCopy = JSON.parse(JSON.stringify(initialBaseSpecTree));

    const generatedSteps = buildStepsFromColumnsAndData({
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
 * Render Task Transformer: Creates and appends the <table> DOM element skeleton during rendering
 */
export const createTableTask = ({ inColumns, inData } = {}) => {
    const localColumns = inColumns;
    const localData = inData;

    return () => {
        return buildTableSpecTreeFromColumnsAndData({ inColumns: localColumns, inData: localData });
    };
};

export default createTableTask;


