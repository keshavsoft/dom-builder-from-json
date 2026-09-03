import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../specs/v2/spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };

import {
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromDefinition
} from "../common/index.js";

import {
    buildHeaderCells,
    buildDataRows
} from "./builders.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const builderMap = {
    headerCells: buildHeaderCells,
    dataRows: buildDataRows
};

const buildTableSpecTreeFromColumnsAndData = ({
    inColumns,
    inData,
    inTemplates = specTemplatesDictionary
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;

    const baseTreeCopy = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );

    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns,
        inData: localData,
        inTemplates: localTemplates,
        inBuilderMap: builderMap
    });

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: localTemplates,
        inEnableLog: false
    });
};

const createTableTask = ({
    inColumns,
    inData
} = {}) => {
    const localColumns = inColumns;
    const localData = inData;

    return ({ inRenderersStore }) => {
        return buildTableSpecTreeFromColumnsAndData({
            inColumns: localColumns,
            inData: localData
        });
    };
};

export {
    createTableTask,
    buildTableSpecTreeFromColumnsAndData,
    initialBaseSpecTree
};

export default createTableTask;
