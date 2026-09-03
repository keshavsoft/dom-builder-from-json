import specTemplatesDictionary from "../../../../../specs/v2/spec.json" with { type: "json" };

const createSearchTask = ({
    inShowSearch = true,
    inTemplates = specTemplatesDictionary
} = {}) => {
    const localShowSearch = inShowSearch !== false;
    const localTemplates = inTemplates || specTemplatesDictionary;

    return () => {
        if (!localShowSearch) {
            return null;
        }

        const searchTemplate = localTemplates?.composite?.search?.template;

        if (searchTemplate) {
            return JSON.parse(JSON.stringify(searchTemplate));
        }

        return null;
    };
};

export {
    createSearchTask
};

export default createSearchTask;
