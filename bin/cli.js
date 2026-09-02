#!/usr/bin/env node

import { printHelpText } from './commands/help.js';
import { executeInitCommand } from './commands/init.js';
import { executeDocsCommand } from './commands/docs.js';
import { executeDefaultsCommand } from './commands/defaults.js';
import { executeUsageCommand } from './commands/usage.js';

const cliArguments = process.argv.slice(2);
const firstArgument = cliArguments[0];

if (cliArguments.length === 0 || cliArguments.includes('--help') || cliArguments.includes('-h') || firstArgument === 'help') {
    printHelpText();
} else if (firstArgument === 'init') {
    executeInitCommand();
} else if (firstArgument === 'docs') {
    executeDocsCommand();
} else if (firstArgument === 'defaults') {
    executeDefaultsCommand();
} else if (firstArgument === 'usage') {
    executeUsageCommand();
} else {
    console.error(`❌ Unknown command: ${firstArgument}`);
    printHelpText();
    process.exit(1);
}
