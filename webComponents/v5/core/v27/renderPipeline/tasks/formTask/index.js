import v1, { buildFormSpecTreeFromColumns } from "./v1/index.js";
import { createBaseTree } from "./v1/stepRunner.js";

const initialBaseSpecTree = createBaseTree();

const versions = {
    v1
};

const defaultVersion = "v1";

const maxVersion = `v${Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
)}`;

const createFormTask = (args) => {
    const selectedVersion = versions[defaultVersion] || v1;
    return selectedVersion(args);
};

export {
    v1,
    versions,
    defaultVersion,
    maxVersion,
    createFormTask,
    buildFormSpecTreeFromColumns,
    initialBaseSpecTree
};

export default createFormTask;
