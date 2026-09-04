const buildStepsFromDefinition = ({
    inStepsDefinition,
    inColumns,
    inData,
    inTemplates,
    inBuilderMap,
    inFooterConfig
}) => {
    const localStepsDefinition = inStepsDefinition;
    const localColumns = inColumns;
    const localData = inData;
    const localTemplates = inTemplates;
    const localBuilderMap = inBuilderMap;
    const localFooterConfig = inFooterConfig;

    if (!localStepsDefinition || typeof localStepsDefinition !== "object") {
        return [];
    }

    if (!localBuilderMap || typeof localBuilderMap !== "object") {
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

        const localBuilder = localBuilderMap[stepDefinition.builder];

        if (typeof localBuilder !== "function") {
            return;
        }

        const generatedValue = localBuilder({
            inColumns: localColumns,
            inData: localData,
            inTemplates: localTemplates,
            inFooterConfig: localFooterConfig
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
    buildStepsFromDefinition
};

export default buildStepsFromDefinition;
