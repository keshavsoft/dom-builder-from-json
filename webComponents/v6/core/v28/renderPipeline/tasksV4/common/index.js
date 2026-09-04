import {
    setPropertyByPath,
    findNodeByTagName,
    applyBindings
} from "./bindingsEngine.js";

import {
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    findTargetNodeByPathParts
} from "./specTreeEngine.js";

import {
    createBaseTree,
    populateTree,
    applyStepToSpecTree
} from "./stepRunner.js";

import {
    runSpecTreeTask
} from "./runSpecTreeTask.js";

import {
    universalBuilderMap
} from "./universalBuilders.js";

export {
    setPropertyByPath,
    findNodeByTagName,
    applyBindings,
    buildBaseSpecTreeFromComposite,
    applySequentialStepsToSpecTree,
    findTargetNodeByPathParts,
    createBaseTree,
    populateTree,
    applyStepToSpecTree,
    runSpecTreeTask,
    universalBuilderMap
};

export default {
    runSpecTreeTask,
    createBaseTree,
    populateTree,
    universalBuilderMap
};
