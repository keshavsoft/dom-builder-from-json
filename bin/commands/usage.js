export function executeUsageCommand() {
    const usageOutputContent = `
💡 KS Web Components Quick Usage
================================

To use the web component dynamically via Javascript:

1. Import the library via CDN:
   <script src="https://keshavsoft.github.io/ks-web-components/dist/v12/ks-web-components.js" type="module"></script>

2. Define your options in Javascript and append to DOM:
   <script>
       const options = {
           inHtmlType: "text",
           inValue: "Hello World",
           inClassName: "text.primary"
       };

       const cell = document.createElement("ks-table-cell-content-common");
       cell.options = options;
       document.body.appendChild(cell);
   </script>
`;
    console.log(usageOutputContent);
}
