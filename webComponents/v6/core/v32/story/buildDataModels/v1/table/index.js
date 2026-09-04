import buildColumnsCollection from "../../../collections/v2/columns/index.js";
import buildRowsCollection from "../../../collections/v2/rows/index.js";
import buildFooterCalculation from "../../../calculations/v1/footer/index.js";

/**
 * Builds the complete, pure Table Data Model
 * Uses collections v2 columns and rows, and calculations v1 footer
 * Follows in -> local parameter naming convention
 */
export const buildTableDataModel = ({
    inColumns,
    inData,
    inFooter,
    inFooterConfig
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localFooter = inFooter;
    const localFooterConfig = inFooterConfig;

    const tHead = buildColumnsCollection({ inColumnsConfig: localColumns });
    const tBody = buildRowsCollection({ inData: localData, inColumns: tHead });
    const tFoot = localFooter || buildFooterCalculation({
        inFooterConfig: localFooterConfig,
        inColumns: tHead,
        inData: tBody
    });

    return {
        tHead,
        tBody,
        tFoot
    };
};

export {
    buildColumnsCollection as prepareHead,
    buildRowsCollection as prepareBody,
    buildFooterCalculation as prepareFoot
};

export default buildTableDataModel;
