import v1 from "./v1/spec.json" with { type: "json" };

const versions = {
    v1
};

const defaultVersion = "v1";

const maxVersion = Math.max(
    ...Object.keys(versions).map(key => Number(key.slice(1)))
);

const maxVersionKey = `v${maxVersion}`;

export {
    v1,
    versions,
    defaultVersion,
    maxVersionKey as maxVersion
};

export default versions[maxVersionKey];
