import fs from 'fs';
import path from 'path';
import { packageRootDirectory } from '../utils/projectPaths.js';
import { extractActiveVersion } from '../utils/versionResolver.js';
import { copyDirectoryRecursively } from '../utils/directoryCopier.js';

const rootFilesToCopy = ['index.js'];

export function executeInitCommand() {
    console.log('📦 Extracting KS Web Components source files...');

    try {
        const activeVersionName = extractActiveVersion();
        const sourceWebComponentsDirectory = path.join(packageRootDirectory, 'webComponents', activeVersionName);
        const destinationWebComponentsDirectory = path.join(process.cwd(), 'webComponents', activeVersionName);

        if (fs.existsSync(sourceWebComponentsDirectory)) {
            if (fs.existsSync(destinationWebComponentsDirectory)) {
                console.warn(`⚠️  Target directory ./webComponents/${activeVersionName} already exists. Files will be overwritten.`);
            }
            copyDirectoryRecursively(sourceWebComponentsDirectory, destinationWebComponentsDirectory);
            console.log(`✅ Successfully copied webComponents/${activeVersionName} to ./webComponents/${activeVersionName}`);
        } else {
            console.warn(`⚠️ Source directory not found: ${sourceWebComponentsDirectory}. Skipping...`);
        }

        for (const fileName of rootFilesToCopy) {
            const sourceFilePath = path.join(packageRootDirectory, fileName);
            const destinationFilePath = path.join(process.cwd(), fileName);
            if (fs.existsSync(sourceFilePath)) {
                fs.copyFileSync(sourceFilePath, destinationFilePath);
                console.log(`✅ Successfully copied ${fileName} to ./${fileName}`);
            }
        }

        const currentWorkingDirectoryIndexHtmlPath = path.join(process.cwd(), 'index.html');
        if (!fs.existsSync(currentWorkingDirectoryIndexHtmlPath)) {
            const templateHtmlFilePath = path.join(packageRootDirectory, 'bin', 'template.html');
            if (fs.existsSync(templateHtmlFilePath)) {
                const templateHtmlContent = fs.readFileSync(templateHtmlFilePath, 'utf8');
                fs.writeFileSync(currentWorkingDirectoryIndexHtmlPath, templateHtmlContent);
                console.log(`✅ Scaffolding complete: Created ./index.html starter file`);
            } else {
                console.warn(`⚠️ Could not find template.html at ${templateHtmlFilePath}. Skipping index.html creation.`);
            }
        }

        console.log(`\nYou can now import and customize the KS Web Components directly from your own project!`);
    } catch (executionError) {
        console.error(`❌ Failed to copy files: ${executionError.message}`);
        process.exit(1);
    }
}
