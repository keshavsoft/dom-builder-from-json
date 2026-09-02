import fs from 'fs';

const extractVersionNumber = (folderName) => {
    const match = folderName.match(/^v(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
};

const getHighestComponentVersion = (componentsPath) => {
    if (!fs.existsSync(componentsPath)) return 0;
    
    const dirs = fs.readdirSync(componentsPath);
    let maxVersion = 0;
    
    for (const dir of dirs) {
        const version = extractVersionNumber(dir);
        if (version > maxVersion) {
            maxVersion = version;
        }
    }
    
    return maxVersion;
};

export { getHighestComponentVersion };
