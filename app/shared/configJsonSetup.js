function configJsonSetup (
    configBuilder,
    configJsonTools
) {
    function doSetup(initOptions) {
        const packageFile = {};
        const configObject = configBuilder.buildConfig(initOptions, packageFile);

        configJsonTools.writeConfigFile(configObject);
    }

    return {
        doSetup
    };
}

module.exports = configJsonSetup;