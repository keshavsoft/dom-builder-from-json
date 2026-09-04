import buildColumnsStoreModule from "./dataStore/v2/columnsStore/v1/buildColumnsStore.js";
import { buildTableDataStore } from "./dataStore/v2/dataStore/v1/buildDataStore.js";

/**
 * Helper: Builds renderer-scoped stores (dataStore UI slices & columnsStore) for active renderers
 */
const buildRenderersStore = ({ inGlobalStore, inRenderers, inColumnsConfig }) => {
    const localGlobalStore = inGlobalStore || {};
    const localColumnsConfig = inColumnsConfig || [];
    const localGlobalData = localGlobalStore?.dataStore?.getOriginalData() || [];

    let storeObject = {};

    for (const [key, value] of Object.entries(inRenderers)) {
        storeObject[key] = {
            store: {
                dataStore: buildTableDataStore({ inData: localGlobalData }),
                columnsStore: buildColumnsStoreModule({
                    inAllColumnsConfig: localColumnsConfig,
                    inConfig: value
                })
            }
        }
    };

    return storeObject;
};

export {
    buildRenderersStore
};

export default buildRenderersStore;
