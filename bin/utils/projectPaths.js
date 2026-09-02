import path from 'path';
import { fileURLToPath } from 'url';

const moduleFilePath = fileURLToPath(import.meta.url);
const utilsDirectoryPath = path.dirname(moduleFilePath);
const binDirectoryPath = path.dirname(utilsDirectoryPath);
export const packageRootDirectory = path.join(binDirectoryPath, '..');
