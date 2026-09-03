import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../specs/v2/spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };

import {
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    buildStepsFromDefinition
} from "../common/index.js";

import {
    buildFormFields
} from "./builders.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const builderMap = {
    formFields: buildFormFields
};

const buildFormSpecTreeFromColumns = ({
    inColumns,
    inTemplates = specTemplatesDictionary
}) => {
    const localColumns = inColumns;
    const localTemplates = inTemplates;

    const baseTreeCopy = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );

    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns,
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

const createFormTask = ({
    inColumns
} = {}) => {
    const localColumns = inColumns;

    return ({ inRenderersStore }) => {
        const localFormStore = inRenderersStore?.form?.store;
        const formColumns = localFormStore?.columnsStore?.getColumnsConfig();

        return buildFormSpecTreeFromColumns({
            inColumns: formColumns || localColumns
        });
    };
};

export {
    createFormTask,
    buildFormSpecTreeFromColumns,
    initialBaseSpecTree
};

export default createFormTask;
