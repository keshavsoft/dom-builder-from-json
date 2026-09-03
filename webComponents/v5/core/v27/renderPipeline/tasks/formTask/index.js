import v1 from "./v1/index.js";
import v2, { buildFormSpecTreeFromColumns } from "./v2/index.js";
import { createBaseTree } from "../common/index.js";
import startJson from "./v2/start.json" with { type: "json" };

const initialBaseSpecTree = createBaseTree({ inCompositeDef: startJson });

const versions = {
    v1,
    v2
};

const defaultVersion = "v2";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const createFormTask = (args) => {
    const selectedVersion = versions[defaultVersion] || v2;
    return selectedVersion(args);
};

export {
    v1,
    v2,
    versions,
    defaultVersion,
    maxVersion,
    createFormTask,
    buildFormSpecTreeFromColumns,
    initialBaseSpecTree
};

export default createFormTask;
