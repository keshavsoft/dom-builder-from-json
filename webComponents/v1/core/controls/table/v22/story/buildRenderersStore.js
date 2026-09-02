/**
 * Helper: Builds renderer-scoped stores for active renderers (e.g. table)
 */
export const buildRenderersStore = ({ inGlobalStore, inRenderers }) => {
    const localGlobalStore = inGlobalStore || {};
    const localRenderers = inRenderers || {};

    const renderersStore = {};

    if (localRenderers.table || true) {
        renderersStore.table = {
            store: {
                columnsStore: localGlobalStore.columnsStore
            }
        };
    }

    return renderersStore;
};

export default buildRenderersStore;
