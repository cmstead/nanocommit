function configJsonTools (
    fs,
    path
) {
    
    const configLocation = path.join(
        process.cwd(),
        '.nanocommit.conf.json'
    );

    function loadConfigFile() {
        const packageFile = require(configLocation);

        return packageFile;
    }

    function writeConfigFile(packageObject) {
        const packageContent = JSON.stringify(packageObject, null, 4);

        fs.writeFileSync(configLocation, packageContent);
    }

    return {
        loadConfigFile,
        writeConfigFile
    };
}

module.exports = configJsonTools;