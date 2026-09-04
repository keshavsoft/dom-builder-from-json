import buildColumnsCollection from "../../../collections/v2/columns/index.js";
import buildRowsCollection from "../../../collections/v2/rows/index.js";
import { prepareFoot } from "./prepareFoot.js";

/**
 * Builds the complete, pure Table Data Model
 * Uses collections v2 columns and rows
 * Follows in -> local parameter naming convention
 */
export const buildTableDataModel = ({
    inColumns,
    inData,
    inFooterConfig
}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localFooterConfig = inFooterConfig;

    const tHead = buildColumnsCollection({ inColumnsConfig: localColumns });
    const tBody = buildRowsCollection({ inData: localData, inColumns: tHead });
    const tFoot = prepareFoot({
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
    prepareFoot
};

export default buildTableDataModel;
