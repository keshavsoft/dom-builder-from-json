import { prepareHead } from "./prepareHead.js";
import { prepareBody } from "./prepareBody.js";
import { prepareFoot } from "./prepareFoot.js";

/**
 * Builds the complete, pure Table Data Model
 * Separates data calculation & projection completely from view/DOM logic
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

    const tHead = prepareHead({ inColumns: localColumns });
    const tBody = prepareBody({ inData: localData, inColumns: localColumns });
    const tFoot = prepareFoot({
        inFooterConfig: localFooterConfig,
        inColumns: localColumns,
        inData: localData
    });

    return {
        tHead,
        tBody,
        tFoot
    };
};

export {
    prepareHead,
    prepareBody,
    prepareFoot
};

export default buildTableDataModel;
