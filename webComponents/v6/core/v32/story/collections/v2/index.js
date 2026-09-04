import buildColumnsCollection from "./columns/index.js";
import buildRowsCollection from "./rows/index.js";

/**
 * Orchestrates canonical UI collections (v2: columns, rows)
 * Follows in -> local parameter naming convention
 */
export const buildCollections = ({ inGlobalStore, inColumnsConfig, inData }) => {
    const localGlobalStore = inGlobalStore || {};
    const localColumnsConfig = inColumnsConfig || [];
    const localData = inData || [];

    const rawColumns = localGlobalStore?.columnsStore?.getOriginalColumnsConfig?.() || localColumnsConfig;
    const rawData = localGlobalStore?.dataStore?.getOriginalData?.() || localData;

    const columns = buildColumnsCollection({
        inColumnsConfig: rawColumns
    });

    const rows = buildRowsCollection({
        inData: rawData,
        inColumns: columns
    });

    return {
        columns,
        rows
    };
};

export {
    buildColumnsCollection,
    buildRowsCollection
};

export default buildCollections;
