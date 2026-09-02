/**
 * Helper: Extracts footer configuration and produces hasFooterConfig flag
 */
export const resolveFooterConfig = ({ inRendererConfig }) => {
    const localRendererConfig = inRendererConfig || {};

    const hasFooterConfig = Boolean(localRendererConfig && ("footer" in localRendererConfig));
    const footerConfig = localRendererConfig?.footer;

    return {
        hasFooterConfig,
        footerConfig
    };
};

export default resolveFooterConfig;
