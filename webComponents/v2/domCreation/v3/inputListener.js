const attachKeydownListener = ({ inElement, inKeydownFunc }) => {
    const localElement = inElement;
    const localKeydownFunc = inKeydownFunc;
    if (!localElement) return;

    localElement.addEventListener("keydown", (e) => {
        if (typeof localKeydownFunc === "function") {
            localKeydownFunc(e);
        } else if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            const focusableElements = Array.from(
                document.querySelectorAll("input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])")
            );
            const currentIndex = focusableElements.indexOf(localElement);
            if (currentIndex >= 0 && currentIndex + 1 < focusableElements.length) {
                focusableElements[currentIndex + 1].focus();
            }
        }
    });
};

const attachKeypressListener = ({ inElement, inKeypressFunc }) => {
    const localElement = inElement;
    const localKeypressFunc = inKeypressFunc;
    if (!localElement) return;

    localElement.addEventListener("keypress", (e) => {
        if (typeof localKeypressFunc === "function") {
            localKeypressFunc(e);
        }
    });
};

export const attachInputListener = ({ inElement, inKeydownFunc, inKeypressFunc }) => {
    const localElement = inElement;
    const localKeydownFunc = inKeydownFunc;
    const localKeypressFunc = inKeypressFunc;
    if (!localElement) return;

    attachKeydownListener({ inElement: localElement, inKeydownFunc: localKeydownFunc });
    attachKeypressListener({ inElement: localElement, inKeypressFunc: localKeypressFunc });
};

export default attachInputListener;
