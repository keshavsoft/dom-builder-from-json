/**
 * Helper: Extracts footer configuration and produces hasFooterConfig flag
 */
export const resolveFooterConfig = ({ inTableConfig }) => {
    const localTableConfig = inTableConfig || {};

    const hasFooterConfig = Boolean(localTableConfig && ("footer" in localTableConfig));
    const footerConfig = localTableConfig?.footer;

    return {
        hasFooterConfig,
        footerConfig
    };
};

export default resolveFooterConfig;
