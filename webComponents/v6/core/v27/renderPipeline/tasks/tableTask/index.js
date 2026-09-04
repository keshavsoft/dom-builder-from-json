import v1 from "./v1/index.js";
import v2 from "./v2/index.js";
import v3 from "./v3/index.js";
import v4 from "./v4/index.js";
import v5 from "./v5/index.js";
import v6 from "./v6/index.js";
import v7 from "./v7/index.js";
import v8 from "./v8/index.js";
import v9 from "./v9/index.js";
import v10 from "./v10/index.js";

const versions = {
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
    v7,
    v8,
    v9,
    v10
};

const defaultVersion = "v10";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const createTableTask = versions[defaultVersion];

export {
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
    v7,
    v8,
    v9,
    v10,
    versions,
    defaultVersion,
    maxVersion,
    createTableTask
};

export default createTableTask;
