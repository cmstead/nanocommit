const configuratronFactory = require('configuratron');
let configuratronInstance = null;

function configurationManager (
    constants,
    defaultConfig
) {
    if(configuratronInstance === null) {
        configuratronInstance = configuratronFactory
        .buildConfiguratron({
            filePath: constants.configFileNames.standalone,
            defaultConfig: defaultConfig
        });
    }

    return configuratronInstance;
}

module.exports = configurationManager;