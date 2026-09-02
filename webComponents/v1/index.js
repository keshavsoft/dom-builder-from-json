import { registerComponent } from "./core/componentRegister.js";
import pullAttributes from "./core/pullAttributes.js";
import resolveSpec from "./core/specResolver.js";

// 1. Cell Custom Element (ks-cell-base)
class KsTableCellContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const finalConfig = pullAttributes(this);
        const controlElement = resolveSpec({ inConfig: finalConfig });

        if (controlElement) {
            this.replaceChildren(controlElement);
        }

        return finalConfig;
    }
}

// 2. Table Custom Element (ks-table-base)
class KsTableBase extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const finalConfig = pullAttributes(this);
        // Force or default controlType to table if not specified
        const tableConfig = { controlType: "table", ...finalConfig };
        const tableElement = resolveSpec({ inConfig: tableConfig });

        if (tableElement) {
            this.replaceChildren(tableElement);
        }

        return finalConfig;
    }
}

// 3. Wrapper Custom Element (ks-wrapper-base)
class KsWrapperForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const finalConfig = pullAttributes(this);
        const wrapperElement = resolveSpec({ inConfig: finalConfig });

        if (wrapperElement) {
            this.replaceChildren(wrapperElement);
        }

        return finalConfig;
    }
}

// Register Web Components under v21
registerComponent({
    inComponentClass: KsTableCellContent,
    inTagName: "ks-cell-base",
    inVersion: "v6",
    inNamespaceKey: "classes"
});

registerComponent({
    inComponentClass: KsTableBase,
    inTagName: "ks-table-base",
    inVersion: "v6-table12",
    inNamespaceKey: "composite"
});

registerComponent({
    inComponentClass: KsWrapperForm,
    inTagName: "ks-wrapper-base",
    inVersion: "v21",
    inNamespaceKey: "composite"
});