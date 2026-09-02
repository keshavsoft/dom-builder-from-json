import fs from 'fs';
import path from 'path';
import { packageRootDirectory } from '../utils/projectPaths.js';
import { extractActiveVersion } from '../utils/versionResolver.js';

export function executeDefaultsCommand() {
    console.log('\n🎨 Predefined JSON Stylings');
    console.log('===========================\n');
    
    try {
        const activeVersionName = extractActiveVersion();
        const baseStylesDirectoryPath = path.join(packageRootDirectory, 'webComponents', activeVersionName, 'cellRenderers', 'renderInputControl', 'v7');
        
        const textClassesFilePath = path.join(baseStylesDirectoryPath, 'PREDEFINED_TEXT_CLASSES.json');
        const buttonClassesFilePath = path.join(baseStylesDirectoryPath, 'PREDEFINED_BUTTON_CLASSES.json');
        
        if (fs.existsSync(textClassesFilePath)) {
            console.log('--- PREDEFINED_TEXT_CLASSES.json ---\n');
            const textClassesContent = fs.readFileSync(textClassesFilePath, 'utf8');
            console.log(textClassesContent);
        }
        
        if (fs.existsSync(buttonClassesFilePath)) {
            console.log('\n--- PREDEFINED_BUTTON_CLASSES.json ---\n');
            const buttonClassesContent = fs.readFileSync(buttonClassesFilePath, 'utf8');
            console.log(buttonClassesContent);
        }
    } catch (readError) {
        console.error('❌ Error reading defaults:', readError.message);
    }
}
