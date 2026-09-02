import fs from 'fs';

const ensureCleanBuildDirectory = (targetPath) => {
    if (fs.existsSync(targetPath)) {
        console.log(`🧹 Cleaning existing build directory: ${targetPath}`);
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
};

export { ensureCleanBuildDirectory };
