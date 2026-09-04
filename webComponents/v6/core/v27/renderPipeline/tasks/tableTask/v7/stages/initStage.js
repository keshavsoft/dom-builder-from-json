import startCompositeDefinition from "../start.json" with { type: "json" };
import specTemplatesDictionary from "../../../../../../../specs/v2/spec.json" with { type: "json" };
import { buildBaseSpecTreeFromComposite } from "../../../common/index.js";

const initialBaseSpecTree = buildBaseSpecTreeFromComposite({
    inCompositeDef: startCompositeDefinition,
    inTemplates: specTemplatesDictionary
});

/**
 * Stage 1: Initializes fresh base table spec tree from start.json
 * Follows in -> local parameter naming convention
 */
export const initBaseSpecTree = ({ inTemplates } = {}) => {
    const localTemplates = inTemplates;

    if (localTemplates) {
        return buildBaseSpecTreeFromComposite({
            inCompositeDef: startCompositeDefinition,
            inTemplates: localTemplates
        });
    }

    return JSON.parse(JSON.stringify(initialBaseSpecTree));
};

export default initBaseSpecTree;
