import v1 from "./v1/spec.json" with { type: "json" };
import v2 from "./v2/spec.json" with { type: "json" };

const versions = {
    v1, v2
};

const defaultVersion = "v1";

const maxVersion = Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
);

const maxVersionKey = `v${maxVersion}`;

export {
    v1, v2,
    versions,
    defaultVersion,
    maxVersionKey as maxVersion
};

export default versions[maxVersionKey];
