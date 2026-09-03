import getObject from "./getObject.js";
import buildRowSpec from "./buildRowSpec.js";

/**
 * Self-contained Inputs Row Module for footer/v3
 */
export const getInputsRow = ({ inInputsConfig, inColumns }) => {
    const localInputsConfig = inInputsConfig;
    const localColumns = inColumns || [];

    if (!localInputsConfig) {
        return null;
    }

    return getObject({
        inInputsConfig: localInputsConfig,
        inColumns: localColumns
    });
};

export { getObject, buildRowSpec };
export default getInputsRow;
