const buildHeaderCells = ({ inColumns }) => {
    const localColumns = inColumns;

    if (!Array.isArray(localColumns)) {
        return [];
    }

    return localColumns.map(column => ({
        tagName: "th",
        attributes: {
            class: "px-4 py-2 border border-gray-300 bg-gray-100 text-left font-semibold text-gray-700"
        },
        textContent: String(column.label)
    }));
};

const buildDataRows = ({ inColumns, inData }) => {
    const localColumns = inColumns;
    const localData = inData;

    if (!Array.isArray(localColumns) || !Array.isArray(localData)) {
        return [];
    }

    return localData.map((item, rowIndex) => {
        const rowTdNodes = localColumns.map(column => {
            const value = item[column.key];

            return {
                tagName: "td",
                attributes: {
                    class: "px-4 py-2 border border-gray-200 text-sm text-gray-800"
                },
                textContent: value !== null && value !== undefined
                    ? String(value)
                    : ""
            };
        });

        return {
            tagName: "tr",
            attributes: {
                class: rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
            },
            children: rowTdNodes
        };
    });
};

const builderMap = {
    headerCells: ({ inColumns }) => {
        return buildHeaderCells({
            inColumns
        });
    },

    dataRows: ({ inColumns, inData }) => {
        return buildDataRows({
            inColumns,
            inData
        });
    }
};

const buildStepsFromDefinition = ({
    inStepsDefinition,
    inColumns,
    inData
}) => {
    const localStepsDefinition = inStepsDefinition;
    const localColumns = inColumns;
    const localData = inData;

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
            inData: localData
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