const COMMON_ATTRIBUTES = {
    "aria-described-by": "aria-describedby",
    "aria-label": "aria-label",
    "data-key": "data-key",
    "dir": "dir",
    "id": "id",
    "name": "name",
    "role": "role",
    "tab-index": "tabindex",
    "title": "title"
};

const INPUT_ATTRIBUTES = {
    "autocomplete": "autocomplete",
    "list": "list",
    "max": "max",
    "max-length": "maxlength",
    "min": "min",
    "min-length": "minlength",
    "pattern": "pattern",
    "size": "size",
    "step": "step"
};

const getCommonAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(COMMON_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    const className = localKsAttributes["class"] || localKsAttributes["class-name"] || localKsAttributes["className"];
    if (className) {
        localResult["class"] = className;
    }

    return localResult;
};

const getInputAttributes = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localResult = {};

    for (const [ksKey, attrName] of Object.entries(INPUT_ATTRIBUTES)) {
        const val = localKsAttributes[ksKey] ?? localKsAttributes[attrName];
        if (val !== undefined && val !== "") {
            localResult[attrName] = val;
        }
    }

    return localResult;
};

const getEvents = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};
    const localEvents = {};

    const rawVal = localKsAttributes?.["enter-as-tab"] ?? localKsAttributes?.enterAsTab ?? localKsAttributes?.["ks-enter-as-tab"];
    const isEnterAsTab = rawVal === "true" || rawVal === true;

    if (isEnterAsTab) {
        localEvents["keydown"] = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const inputs = Array.from(document.querySelectorAll("input"));
                const currentIndex = inputs.indexOf(event.currentTarget);

                if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        };
    }

    return localEvents;
};

const renderInput = ({ inKsAttributes }) => {
    const localKsAttributes = inKsAttributes || {};

    const localCommonAttrs = getCommonAttributes({ inKsAttributes: localKsAttributes });
    const localInputAttrs = getInputAttributes({ inKsAttributes: localKsAttributes });
    const localEvents = getEvents({ inKsAttributes: localKsAttributes });

    return {
        tagName: "input",
        properties: {
            type: localKsAttributes["type"] || localKsAttributes["inputType"] || "text",
            value: localKsAttributes["value"] || "",
            placeholder: localKsAttributes["place-holder"] || localKsAttributes["placeholder"] || localKsAttributes["inputPlaceholder"] || ""
        },
        attributes: { ...localCommonAttrs, ...localInputAttrs },
        events: localEvents
    };
};

export default renderInput;
