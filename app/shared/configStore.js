function configStore (optionsReader) {
    
    let configCache = null;

    function setConfig (config) {
        configCache = config;
    }

    function getConfig() {
        if(configCache === null) {
            configCache = optionsReader.readOptions();
        }

        return configCache;
    }

    return {
        setConfig,
        getConfig
    };
}

configStore['@singleton'] = true;

module.exports = configStore;