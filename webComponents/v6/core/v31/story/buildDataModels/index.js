import v1 from "./v1/index.js";

const versions = {
    v1
};

const defaultVersion = "v1";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const buildDataModels = versions[defaultVersion];

export {
    v1,
    versions,
    defaultVersion,
    maxVersion,
    buildDataModels
};

export default buildDataModels;
