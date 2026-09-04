const setPropertyByPath = ({ inNode, inPath, inValue }) => {
    const localNode = inNode;
    const localPath = inPath;
    const localValue = inValue;

    if (!localNode || !localPath) return;

    const parts = localPath.split(".");
    let current = localNode;

    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part] || typeof current[part] !== "object") {
            current[part] = {};
        }
        current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = localValue;
};

const findNodeByTagName = ({ inNode, inTagName }) => {
    const localNode = inNode;
    const localTagName = inTagName;

    if (!localNode) return null;
    if (localNode.tagName === localTagName) return localNode;

    if (Array.isArray(localNode.children)) {
        for (const child of localNode.children) {
            const found = findNodeByTagName({ inNode: child, inTagName: localTagName });
            if (found) return found;
        }
    }

    return null;
};

const applyBindings = ({ inTemplate, inBindings, inData }) => {
    const localTemplate = inTemplate;
    const localBindings = inBindings;
    const localData = inData;

    const clonedNode = JSON.parse(JSON.stringify(localTemplate));

    if (!Array.isArray(localBindings)) {
        return clonedNode;
    }

    for (const binding of localBindings) {
        const targetNode = binding.find
            ? findNodeByTagName({ inNode: clonedNode, inTagName: binding.find })
            : clonedNode;

        if (!targetNode) continue;

        let value = localData[binding.source];
        if (value === undefined || value === null) {
            if (binding.default !== undefined) {
                value = binding.default;
            } else {
                value = "";
            }
        }

        setPropertyByPath({
            inNode: targetNode,
            inPath: binding.property,
            inValue: String(value)
        });
    }

    return clonedNode;
};

const buildHeaderCells = ({ inColumns, inTemplates }) => {
    const localColumns = inColumns;
    const localTemplates = inTemplates;

    if (!Array.isArray(localColumns)) {
        return [];
    }

    const headerCellComposite = localTemplates?.composite?.tableHeaderCell;
    const template = headerCellComposite?.template;
    const bindings = headerCellComposite?.bindings;

    if (!template) {
        return [];
    }

    return localColumns.map(column => {
        return applyBindings({
            inTemplate: template,
            inBindings: bindings,
            inData: column
        });
    });
};

const buildDataRows = ({ inColumns, inData, inTemplates }) => {
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;

    if (!Array.isArray(localColumns) || !Array.isArray(localData)) {
        return [];
    }

    const rowComposite = localTemplates?.composite?.tableRow;
    const dataCellComposite = localTemplates?.composite?.tableDataCell;

    const rowTemplate = rowComposite?.template;
    const cellTemplate = dataCellComposite?.template;
    const cellBindings = dataCellComposite?.bindings;

    if (!rowTemplate || !cellTemplate) {
        return [];
    }

    return localData.map((item, rowIndex) => {
        const rowNode = JSON.parse(JSON.stringify(rowTemplate));
        if (!rowNode.attributes) rowNode.attributes = {};
        rowNode.attributes.class = rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50";

        const rowTdNodes = localColumns.map(column => {
            const value = item[column.key];
            const cellData = {
                key: column.key,
                value: value !== null && value !== undefined ? String(value) : ""
            };

            return applyBindings({
                inTemplate: cellTemplate,
                inBindings: cellBindings,
                inData: cellData
            });
        });

        rowNode.children = rowTdNodes;
        return rowNode;
    });
};

const builderMap = {
    headerCells: ({ inColumns, inTemplates }) => {
        return buildHeaderCells({
            inColumns,
            inTemplates
        });
    },

    dataRows: ({ inColumns, inData, inTemplates }) => {
        return buildDataRows({
            inColumns,
            inData,
            inTemplates
        });
    }
};

const buildStepsFromDefinition = ({
    inStepsDefinition,
    inColumns,
    inData,
    inTemplates
}) => {
    const localStepsDefinition = inStepsDefinition;
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;

    if (!localStepsDefinition || typeof localStepsDefinition !== "object") {
        return [];
    }

    const generatedSteps = [];

    const stepEntries = Array.isArray(localStepsDefinition)
        ? localStepsDefinition.map(step => [step.name, step])
        : Object.entries(localStepsDefinition);

    stepEntries.forEach(([stepKey, stepDefinition]) => {
        if (!stepDefinition || !stepDefinition.builder) {
            return;
        }

        const localBuilder = builderMap[stepDefinition.builder];

        if (typeof localBuilder !== "function") {
            return;
        }

        const generatedValue = localBuilder({
            inColumns: localColumns,
            inData: localData,
            inTemplates: localTemplates
        });

        generatedSteps.push({
            find: stepDefinition.find,
            target: stepDefinition.target,
            value: generatedValue
        });
    });

    return generatedSteps;
};

export {
    buildStepsFromDefinition,
    buildHeaderCells,
    buildDataRows
};

export default buildStepsFromDefinition;