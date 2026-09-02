import buildBodyRowsSpec from "./buildBodyRowsSpec.js";
import attachBodyRowsToTbody from "./attachBodyRowsToTbody.js";

/**
 * Body Module Orchestrator: Builds and attaches <tbody> rows to tableSpec
 */
export const buildBody = ({ inTableSpec, inData, inColumns, inTrSpec, inTdSpec }) => {
    const localTableSpec = inTableSpec;
    const localData = inData || [];
    const localColumns = inColumns || [];
    const localTrSpec = inTrSpec;
    const localTdSpec = inTdSpec;

    if (Array.isArray(localData) && localData.length > 0 && localTrSpec && localTdSpec) {
        const bodyRows = buildBodyRowsSpec({
            inData: localData,
            inColumns: localColumns,
            inTrSpec: localTrSpec,
            inTdSpec: localTdSpec
        });

        attachBodyRowsToTbody({
            inTableSpec: localTableSpec,
            inBodyRows: bodyRows
        });
    }

    return localTableSpec;
};

export default buildBody;
