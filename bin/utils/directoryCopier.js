import fs from 'fs';
import path from 'path';

export function copyDirectoryRecursively(sourceDirectory, destinationDirectory) {
    if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    const directoryEntries = fs.readdirSync(sourceDirectory, { withFileTypes: true });

    for (const directoryEntry of directoryEntries) {
        const sourceFilePath = path.join(sourceDirectory, directoryEntry.name);
        const destinationFilePath = path.join(destinationDirectory, directoryEntry.name);

        if (directoryEntry.isDirectory()) {
            copyDirectoryRecursively(sourceFilePath, destinationFilePath);
        } else {
            fs.copyFileSync(sourceFilePath, destinationFilePath);
        }
    }
}
