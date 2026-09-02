import fs from 'fs';
import path from 'path';
import { packageRootDirectory } from './projectPaths.js';

export function extractActiveVersion() {
    const indexJsFilePath = path.join(packageRootDirectory, 'index.js');
    
    if (!fs.existsSync(indexJsFilePath)) {
        throw new Error('index.js is missing');
    }
    
    const indexJsContent = fs.readFileSync(indexJsFilePath, 'utf8');
    const versionMatchResult = indexJsContent.match(/webComponents\/(v\d+)/);
    
    if (!versionMatchResult) {
        throw new Error('Version identifier missing from index.js');
    }
    
    return versionMatchResult[1];
}
