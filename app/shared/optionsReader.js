function optionsReader(
    defaultOptions,
    packageTools,
    configJsonTools,
    optionsUtils
) {
    function getPackageFile() {
        try{
            return packageTools.loadPackageFile();
        } catch (e) {
            return {};
        }
    }

    function loadUserOptions() {
        if(packageTools.doesPackageFileExist()) {
            return getPackageFile().nanocommit;
        } else {
            return configJsonTools.loadConfigFile();
        }
    }

    function readOptions() {
        let options;
        
        try{
            options = loadUserOptions();
        } catch (e) {
            options = {};
        }

        return optionsUtils.mergeOptions(options, defaultOptions);
    }

    return {
        readOptions,
        mergeOptions: optionsUtils.mergeOptions
    };
}

module.exports = optionsReader;