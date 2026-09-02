import specJson from "./spec.json" with { type: "json" };
import domCreationFuncs from "../../../../domCreation/index.js";

export const startFunc = () => {
    const domElement = domCreationFuncs.versions[domCreationFuncs.maxVersion](specJson);

    return domElement;
};

export default startFunc;