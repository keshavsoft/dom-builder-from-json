import renderInput from "./controls/input.js";
import renderTable from "./controls/table/v1/index.js";

import domElementBuilder from "../domCreation/v2/index.js";
import themes from "./themes.json" with { type: "json" };

const controlRenderers = {
    input: renderInput,
    table: renderTable
};

const renderLeafControl = ({ inConfig, inFallbackControlType }) => {
    const localConfig = inConfig || {};
    const controlType = localConfig["control-type"] || localConfig["controlType"] || inFallbackControlType || "input";
    const renderer = controlRenderers[controlType] || renderInput;

    if (controlType === "table") {
        return renderer({ inKsAttributes: localConfig });
    }

    const spec = renderer({ inKsAttributes: localConfig });
    const themeName = localConfig["theme"] || "default";
    const themeClasses = themes[themeName]?.[controlType];

    return domElementBuilder({
        inSpec: spec,
        inControlType: controlType,
        inThemeName: themeName,
        inClassList: themeClasses
    });
};

export const resolveSpec = ({ inConfig, inKey, inInferredType }) => {
    const localConfig = inConfig || {};

    const controlType = localConfig["control-type"] || localConfig["controlType"] || localConfig["type"] || inInferredType;

    // 1. Resolve Table Control
    if (controlType === "table" || localConfig.headers || localConfig.rows) {
        return renderLeafControl({ inConfig: localConfig, inFallbackControlType: "table" });
    }

    // 2. Resolve Cell Control (input, button, checkbox, label)
    if (controlType && controlRenderers[controlType]) {
        return renderLeafControl({ inConfig: localConfig, inFallbackControlType: controlType });
    }

    // 3. Fallback for cell control object configuration
    if (typeof localConfig === "object" && localConfig !== null && Object.keys(localConfig).length > 0) {
        return renderLeafControl({ inConfig: localConfig, inFallbackControlType: "input" });
    }

    return null;
};

export default resolveSpec;

