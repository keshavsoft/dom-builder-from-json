import compareSpecs from "./v1/compareSpecs.js";

const versions = {
    v1: compareSpecs
};

const defaultVersion = "v1";

export { compareSpecs };
export default {
    versions,
    defaultVersion,
    compareSpecs
};
