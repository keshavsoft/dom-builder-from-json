export function printHelpText() {
    const helpOutput = `
🚀 KS Web Components CLI
========================

KS Web Components is a robust, JSON-driven Web Component library for generating complex data tables, vertical forms, and interactive input cells.

Usage:
  npx ks-web-components <command>

Commands:
  init        Extracts the active KS Web Components source folder and index.js to the current directory.
  docs        Prints the README / Documentation to the console.
  defaults    Prints the predefined JSON configurations for styling.
  usage       Prints a quick Javascript usage cheat sheet.
  help        Shows this help message.

Options:
  --help, -h  Shows this help message.

Example:
  npx ks-web-components defaults
`;
    console.log(helpOutput);
}
