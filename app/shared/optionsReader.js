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

    function getNanocommitOptions (packageFile) {
        return typeof packageFile.nanocommit === 'object'
            && packageFile.nanocommit !== null
            ? packageFile.nanocommit
            : {};
    }

    function loadUserOptions() {
        if(packageTools.doesPackageFileExist()) {
            return getNanocommitOptions(getPackageFile());
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