import buildSpecFromElement from "./v1/buildSpecFromElement.js";

const versions = {
    v1: buildSpecFromElement
};

const defaultVersion = "v1";

export { buildSpecFromElement };
export default {
    versions,
    defaultVersion,
    buildSpecFromElement
};
