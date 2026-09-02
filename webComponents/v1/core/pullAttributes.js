// Stage 1: Pull inline attributes starting with ks-
export const pullInlineAttributes = ({ inContext }) => {
    const localContext = inContext;
    const localAttributes = {};

    if (!localContext || !localContext.attributes) return localAttributes;

    for (const attr of localContext.attributes) {
        if (attr.name.startsWith("ks-")) {
            const key = attr.name.slice(3); // Remove "ks-" prefix
            localAttributes[key] = attr.value;
        }
    }

    return localAttributes;
};

// Stage 2: Capture JS config object as-is
export const captureJsConfig = ({ inContext }) => {
    const localContext = inContext;
    if (!localContext) return {};

    // console.log("inContext config : ", inContext.config);

    return localContext.config || localContext._config || {};
};

// Stage 3: Merge both into Single Source of Truth at one central place
export const resolveConfiguration = ({ inContext }) => {
    const localContext = inContext;

    const localAttributeConfig = pullInlineAttributes({ inContext: localContext });
    const localJsConfig = captureJsConfig({ inContext: localContext });

    // Merged single source of truth object
    return {
        ...localAttributeConfig,
        ...localJsConfig
    };
};

export default (instance) => resolveConfiguration({ inContext: instance });
