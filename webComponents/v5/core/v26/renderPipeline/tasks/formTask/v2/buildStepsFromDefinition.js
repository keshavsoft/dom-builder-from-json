const buildFormFields = ({ inColumns, inTemplates }) => {
    const localColumns = inColumns;

    if (!Array.isArray(localColumns) || localColumns.length === 0) {
        return [];
    }

    return localColumns.map(column => {
        const fieldKey = String(column.key || "");
        const fieldLabel = String(column.label || column.key || "");
        const fieldType = column.type || "text";
        const fieldPlaceholder = column.placeholder || fieldLabel;

        return {
            tagName: "div",
            attributes: {
                class: "flex flex-col space-y-1 mb-4"
            },
            children: [
                {
                    tagName: "label",
                    attributes: {
                        for: fieldKey,
                        class: "text-sm font-medium text-gray-700 capitalize"
                    },
                    textContent: fieldLabel
                },
                {
                    tagName: "input",
                    attributes: {
                        type: fieldType,
                        id: fieldKey,
                        name: fieldKey,
                        placeholder: fieldPlaceholder,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
                    }
                }
            ]
        };
    });
};

const builderMap = {
    formFields: ({ inColumns, inTemplates }) => {
        console.log("inColumns ---------:", inColumns, inTemplates);

        return buildFormFields({
            inColumns, inTemplates
        });
    }
};

const buildStepsFromDefinition = ({
    inStepsDefinition,
    inColumns,
    inData, inTemplates
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
            inData: localData, inTemplates
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
    buildFormFields
};

export default buildStepsFromDefinition;
