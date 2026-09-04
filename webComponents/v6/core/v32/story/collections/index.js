import v1 from "./v1/index.js";
import v2 from "./v2/index.js";

const versions = {
    v1,
    v2
};

const defaultVersion = "v2";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const buildCollections = versions[defaultVersion];

export {
    v1,
    v2,
    versions,
    defaultVersion,
    maxVersion,
    buildCollections
};

export default buildCollections;
