import buildFooterRowSpec from "./buildFooterRowSpec.js";

/**
 * Footer Module: Pure function returning <tfoot> <tr> row specs array or null
 */
export const buildFooter = ({ inFooterConfig, inHasFooterConfig, inTrSpec, inThSpec }) => {
    const localFooterConfig = inFooterConfig;
    const localHasFooterConfig = inHasFooterConfig;
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    if (!localHasFooterConfig) {
        return null;
    }

    const footerCells = Array.isArray(localFooterConfig)
        ? localFooterConfig
        : (localFooterConfig?.cells || localFooterConfig?.rows || null);

    if (Array.isArray(footerCells) && footerCells.length > 0 && localTrSpec && localThSpec) {
        const footerRow = buildFooterRowSpec({
            inFooterCells: footerCells,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec
        });

        return [footerRow];
    }

    return [];
};

export default buildFooter;
