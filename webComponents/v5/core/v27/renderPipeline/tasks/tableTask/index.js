import v1 from "./v1/index.js";
import v2 from "./v2/index.js";
import v3 from "./v3/index.js";
import v4 from "./v4/index.js";

const versions = {
    v1,
    v2,
    v3,
    v4
};

const defaultVersion = "v4";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const createTableTask = versions[defaultVersion];

export {
    v1,
    v2,
    v3,
    v4,
    versions,
    defaultVersion,
    maxVersion,
    createTableTask
};

export default createTableTask;
