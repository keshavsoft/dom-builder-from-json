import { buildFooterCalculation } from "./footer/index.js";

/**
 * Stage: Calculates derived and manipulated row collections (summaries, formulas, balance)
 * Follows in -> local parameter naming convention
 */
export const buildCalculations = ({
    inCollections,
    inRenderers,
    inColumns,
    inData,
    inFooterConfig
} = {}) => {
    const localCollections = inCollections || {};
    const localRenderers = inRenderers || {};
    const localColumns = inColumns || localCollections.columns || [];
    const localData = inData || localCollections.rows || [];
    const localFooterConfig = inFooterConfig || localRenderers?.table?.footer;

    const footer = buildFooterCalculation({
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData
    });

    return {
        footer
    };
};

export {
    buildFooterCalculation
};

export default buildCalculations;
