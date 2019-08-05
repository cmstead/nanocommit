function optionsReader(
    path,
    defaultOptions
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

    function getUserOptions() {
        const packagePath = path.join(process.cwd(), 'package.json');
        const packageFile = require(packagePath);
        return typeof packageFile.nanocommit === 'object'
            ? packageFile.nanocommit
            : {};
    }

    function readOptions() {
        const options = getUserOptions();

        return mergeOptions(options, defaultOptions);
    }

    return {
        readOptions
    };
}

module.exports = optionsReader;