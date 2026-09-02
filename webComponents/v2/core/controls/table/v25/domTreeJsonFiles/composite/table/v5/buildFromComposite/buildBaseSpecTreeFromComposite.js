import buildNodeSpecTree from "./buildNodeSpecTree.js";

export const buildBaseSpecTreeFromComposite = ({ inCompositeDef, inTemplates }) => {
    const localCompositeDef = inCompositeDef;
    const localTemplates = inTemplates;

    if (!localCompositeDef || !localTemplates) {
        return null;
    }

    const compositeEntries = Object.entries(localCompositeDef);
    if (compositeEntries.length === 0) return null;

    const [topLevelKey, topLevelStructure] = compositeEntries[0];
    return buildNodeSpecTree({
        inKey: topLevelKey,
        inStructure: topLevelStructure,
        inTemplates: localTemplates
    });
};

export default buildBaseSpecTreeFromComposite;
