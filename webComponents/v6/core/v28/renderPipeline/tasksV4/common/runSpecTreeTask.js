import specTemplatesDictionary from "../../../../../specs/v2/spec.json" with { type: "json" };
import { createBaseTree, populateTree } from "./stepRunner.js";

/**
 * Universal Spec Tree Task Runner
 * Executes: Base Tree Creation -> Spec Tree Population via Data Model -> Returns Populated Spec Tree
 * Follows in -> local parameter naming convention
 */
export const runSpecTreeTask = ({
    inStartDef,
    inSteps,
    inBuilderMap,
    inDataModel,
    inTemplates = specTemplatesDictionary,
    inLogUnfoundKeys = false
} = {}) => {
    const localStartDef = inStartDef;
    const localSteps = inSteps;
    const localBuilderMap = inBuilderMap;
    const localDataModel = inDataModel;
    const localTemplates = inTemplates || specTemplatesDictionary;
    const localLogUnfoundKeys = inLogUnfoundKeys;

    // Step 1: Initialize base spec tree skeleton
    const baseSpecTree = createBaseTree({
        inCompositeDef: localStartDef,
        inTemplates: localTemplates
    });

    // Step 2: Populate tree through declarative steps using precomputed dataModel
    const populatedSpecTree = populateTree({
        inSpecTree: baseSpecTree,
        inSteps: localSteps,
        inDataModel: localDataModel,
        inBuilderMap: localBuilderMap,
        inTemplates: localTemplates,
        inLogUnfoundKeys: localLogUnfoundKeys
    });

    // Step 3: Return completed JSON spec tree
    return populatedSpecTree;
};

export default runSpecTreeTask;
