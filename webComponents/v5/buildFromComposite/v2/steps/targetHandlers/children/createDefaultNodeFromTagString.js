export const createDefaultNodeFromTagString = ({ inValue }) => {
    const localValue = inValue;

    if (typeof localValue === "string" && localValue.trim() !== "") {
        return {
            tagName: localValue.trim(),
            attributes: {
                class: ""
            },
            children: []
        };
    }
    return null;
};

export default createDefaultNodeFromTagString;
