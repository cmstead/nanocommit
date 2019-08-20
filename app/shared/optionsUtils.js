function optionsUtils () {
    
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

    return {
        mergeOptions
    };
}

module.exports = optionsUtils;