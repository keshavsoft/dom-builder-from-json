import attachInputListener from "./inputListener.js";

const startFunc = ({ inSpec, inControlType, inThemeName, inClassList }) => {
    const localSpec = inSpec;
    if (!localSpec || !localSpec.tagName) return null;

    // 1. Create Element
    const element = document.createElement(localSpec.tagName);

    if (localSpec.tagName === "input") {
        attachInputListener({
            inElement: element,
            inKeydownFunc: localSpec.events?.keydown,
            inKeypressFunc: localSpec.events?.keypress
        });
    }

    // 2. Direct Element Properties & Text Content
    if (localSpec.textContent) {
        element.textContent = localSpec.textContent;
    }

    if (localSpec.properties) {
        Object.assign(element, localSpec.properties);
    }

    // 3. Set Attributes & Classes
    if (localSpec.attributes) {
        Object.entries(localSpec.attributes).forEach(([attrName, val]) => {
            if (attrName === "class") {
                element.className = val;
            } else {
                element.setAttribute(attrName, val);
            }
        });
    }

    // 4. Inject Theme Classes
    if (inClassList) {
        element.classList.add(...inClassList.split(/\s+/).filter(Boolean));
    }

    // 5. Centralized Event Listener Binding
    if (localSpec.events && typeof localSpec.events === "object") {
        Object.entries(localSpec.events).forEach(([eventName, listener]) => {
            if (localSpec.tagName === "input" && (eventName === "keydown" || eventName === "keypress")) {
                return;
            }
            element.addEventListener(eventName, listener);
        });
    }

    // 6. Append Child DOM Elements (for container / wrapper nodes)
    if (Array.isArray(localSpec.children)) {
        localSpec.children.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
        });
    }

    return element;
};

export default startFunc;