import buildFooterRowSpec from "./buildFooterRowSpec.js";
import attachFooterRowToTfoot from "./attachFooterRowToTfoot.js";

/**
 * Footer Module Orchestrator: Manages <tfoot> attachment based on footer config presence
 */
export const buildFooter = ({ inTableSpec, inFooterConfig, inHasFooterConfig, inTrSpec, inThSpec }) => {
    const localTableSpec = inTableSpec;
    const localFooterConfig = inFooterConfig;
    const localHasFooterConfig = inHasFooterConfig;
    const localTrSpec = inTrSpec;
    const localThSpec = inThSpec;

    // 1. If footer key is not present in config, remove tfoot node from tableSpec
    if (!localHasFooterConfig) {
        if (Array.isArray(localTableSpec.children)) {
            localTableSpec.children = localTableSpec.children.filter(child => child.tagName !== "tfoot");
        }
        return localTableSpec;
    }

    // 2. If footer key is present and custom footer cells/rows are supplied
    const footerCells = Array.isArray(localFooterConfig)
        ? localFooterConfig
        : (localFooterConfig?.cells || localFooterConfig?.rows || null);

    if (Array.isArray(footerCells) && footerCells.length > 0 && localTrSpec && localThSpec) {
        const footerRow = buildFooterRowSpec({
            inFooterCells: footerCells,
            inTrSpec: localTrSpec,
            inThSpec: localThSpec
        });

        attachFooterRowToTfoot({
            inTableSpec: localTableSpec,
            inFooterRow: footerRow
        });
    }

    return localTableSpec;
};

export default buildFooter;
