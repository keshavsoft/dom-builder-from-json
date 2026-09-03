import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../../specs/v2/spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };

import {
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromDefinition
} from "../../common/index.js";

import { builderMap } from "./builders/index.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

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

    const baseTreeCopy = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );
    console.log("inFooterConfig : ", inFooterConfig);
    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns,
        inData: localData,
        inTemplates: localTemplates,
        inBuilderMap: builderMap,
        inFooterConfig: localFooterConfig
    });
    // console.log("generatedSteps : ", generatedSteps);

    return applySequentialStepsToSpecTree({
        inSpecTree: baseTreeCopy,
        inStepsDef: generatedSteps,
        inTemplates: localTemplates,
        inEnableLog: false
    });
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
