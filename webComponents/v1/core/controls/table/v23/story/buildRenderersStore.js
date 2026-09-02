import buildColumnsStoreModule from "./dataStore/v2/columnsStore/v1/buildColumnsStore.js";
import { buildTableDataStore } from "./dataStore/v2/dataStore/v1/buildDataStore.js";

/**
 * Helper: Builds renderer-scoped stores (dataStore UI slices & columnsStore) for active renderers
 */
export const buildRenderersStore = ({ inGlobalStore, inRenderers, inColumnsConfig }) => {
    const localGlobalStore = inGlobalStore || {};
    const localColumnsConfig = inColumnsConfig || [];
    const localGlobalData = localGlobalStore?.dataStore?.getOriginalData() || [];

    return {
        table: {
            store: {
                dataStore: buildTableDataStore({ inData: localGlobalData }),
                columnsStore: buildColumnsStoreModule({ inColumnsConfig: localColumnsConfig })
            }
        }
    };
};

export default buildRenderersStore;
