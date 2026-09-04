import buildColumnsCollection from "./columns/index.js";

/**
 * Builds canonical UI collections from globalStore
 * Follows in -> local parameter naming convention
 */
export const buildCollections = ({ inGlobalStore, inColumnsConfig }) => {
    const localGlobalStore = inGlobalStore || {};
    const localColumnsConfig = inColumnsConfig || [];

    const rawColumns = localGlobalStore?.columnsStore?.getOriginalColumnsConfig?.() || localColumnsConfig;

    const columns = buildColumnsCollection({
        inColumnsConfig: rawColumns
    });

    return {
        columns
    };
};

export {
    buildColumnsCollection
};

export default buildCollections;
