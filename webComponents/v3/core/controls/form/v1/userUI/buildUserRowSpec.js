/**
 * User UI Layer Helper: Constructs single field row spec (Label + Input) for user-defined controls
 */
export const buildUserRowSpec = ({ inField }) => {
    const localField = inField || {};
    const fieldName = localField.name || "";
    const fieldLabel = localField.label || fieldName;
    const fieldType = localField.type || "text";
    const placeholder = localField.placeholder || `Enter ${fieldLabel.toLowerCase()}`;

    return {
        tagName: "div",
        attributes: {
            class: "form-group flex flex-col space-y-1"
        },
        children: [
            {
                tagName: "label",
                attributes: {
                    class: "block text-sm font-medium text-gray-700",
                    for: fieldName
                },
                textContent: fieldLabel
            },
            {
                tagName: "input",
                attributes: {
                    type: fieldType,
                    id: fieldName,
                    name: fieldName,
                    placeholder: placeholder,
                    class: "border border-gray-300 bg-white rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
            }
        ]
    };
};

export default buildUserRowSpec;
