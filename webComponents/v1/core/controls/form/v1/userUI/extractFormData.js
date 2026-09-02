/**
 * User UI Layer Helper: Extracts data key-value pairs from mounted form controls
 */
export const extractFormData = ({ inFormElement }) => {
    const localFormElement = inFormElement;
    if (!localFormElement) return {};

    const formDataObj = {};
    const inputs = localFormElement.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        if (input.name) {
            formDataObj[input.name] = input.value;
        }
    });
    return formDataObj;
};

export default extractFormData;
