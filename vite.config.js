import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { getHighestComponentVersion } from './viteBuild/getHighestComponentVersion.js';
import { ensureCleanBuildDirectory } from './viteBuild/ensureCleanBuildDirectory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. Configuration ---
const CONFIG = {
  webComponentsPath: path.join(__dirname, 'webComponents'),
  outputBaseDir: path.join(__dirname, 'docs', 'dist'),
  publicDir: false // Disable the public directory copying feature to avoid Vite warnings
};

// --- 2. Orchestration ---
const targetVersion = getHighestComponentVersion(CONFIG.webComponentsPath);
const targetAbsolutePath = path.join(CONFIG.outputBaseDir, `v${targetVersion}`);
const targetRelativePath = `docs/dist/v${targetVersion}`;

ensureCleanBuildDirectory(targetAbsolutePath);

// --- 3. Vite Export ---
export default defineConfig({
  publicDir: CONFIG.publicDir,
  build: {
    outDir: targetRelativePath,
    emptyOutDir: true,
    lib: {
      entry: 'index.js',
      name: 'ksWebComponents',
      fileName: 'ks-web-components'
    }
  }
});
