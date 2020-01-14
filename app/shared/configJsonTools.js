function configJsonTools (
    configurationManager
) {

    function loadConfigFile() {
        return configurationManager.readConfig();
    }

    function writeConfigFile(packageObject) {
        configurationManager.setConfig(packageObject);

        configurationManager.writeConfig();
    }

    return {
        loadConfigFile,
        writeConfigFile
    };
}

module.exports = configJsonTools;