function optionsReader(
    defaultOptions,
    packageTools,
    configJsonTools
) {
    function valueOrDefault(value, defaultValue) {
        return typeof value !== 'undefined'
            ? value
            : defaultValue;
    }

    function mergeOptions(destination, source) {
        Object.keys(source)
            .forEach(function (key) {
                destination[key] = valueOrDefault(
                    destination[key],
                    source[key]
                )
            });

        return destination;
    }

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
        const options = loadUserOptions();

        return mergeOptions(options, defaultOptions);
    }

    return {
        readOptions
    };
}

module.exports = optionsReader;