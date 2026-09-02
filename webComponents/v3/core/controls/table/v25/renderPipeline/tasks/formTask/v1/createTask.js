import startCompositeDefinition from "./start.json" with { type: "json" };
import specTemplatesDictionary from "./spec.json" with { type: "json" };
import stepsDefinition from "./steps.json" with { type: "json" };

import buildBaseSpecTreeFromComposite, {
    applySequentialStepsToSpecTree
} from "./buildFromComposite.js";

import buildStepsFromDefinition from "./buildStepsFromDefinition.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

const buildFormSpecTreeFromColumns = ({
    inColumns
}) => {
    const localColumns = inColumns;

    const baseTreeCopy = JSON.parse(
        JSON.stringify(initialBaseSpecTree)
    );

    const generatedSteps = buildStepsFromDefinition({
        inStepsDefinition: stepsDefinition,
        inColumns: localColumns
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
 * Creates the complete form specification tree from columns.
 */
export const createFormTask = ({
    inColumns
} = {}) => {
    const localColumns = inColumns;

    return () => {
        return buildFormSpecTreeFromColumns({
            inColumns: localColumns
        });
    };
};

export {
    buildFormSpecTreeFromColumns,
    initialBaseSpecTree
};

export default createFormTask;
