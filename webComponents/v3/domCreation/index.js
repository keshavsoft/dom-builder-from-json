import v5 from "./v5/buildSpecElement.js";
import v6 from "./v6/buildSpecElement.js";

const versions = {
    v5,
    v6
};

const defaultVersion = "v6";

const maxVersion = Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
);

const maxVersionKey = `v${maxVersion}`;

export default {
    versions,
    defaultVersion,
    maxVersion: maxVersionKey
};