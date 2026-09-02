import fs from 'fs';
import path from 'path';
import { packageRootDirectory } from '../utils/projectPaths.js';

export function executeDocsCommand() {
    console.log('\n📖 KS Web Components Documentation');
    console.log('===================================\n');
    
    try {
        const readmeFilePath = path.join(packageRootDirectory, 'README.md');
        if (fs.existsSync(readmeFilePath)) {
            const readmeFileContent = fs.readFileSync(readmeFilePath, 'utf8');
            console.log(readmeFileContent);
        } else {
            console.log('❌ README.md not found.');
        }
    } catch (readError) {
        console.error('❌ Error reading docs:', readError.message);
    }
}
