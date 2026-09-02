export function registerComponent({ inComponentClass, inTagName, inVersion, inNamespaceKey }) {
    const localComponentClass = inComponentClass;
    const localTagName = inTagName;
    const localVersion = inVersion;
    const localNamespaceKey = inNamespaceKey;

    if (!customElements.get(localTagName)) {
        customElements.define(localTagName, localComponentClass);
    }

    window.ks = window.ks || {};
    window.ks.webComponents = window.ks.webComponents || {};
    window.ks.webComponents[localNamespaceKey] = window.ks.webComponents[localNamespaceKey] || {};

    // Register component under namespace
    window.ks.webComponents[localNamespaceKey][localComponentClass.name] = localComponentClass;
    window.ks.webComponents[localNamespaceKey][localComponentClass.name].version = localVersion;
}
