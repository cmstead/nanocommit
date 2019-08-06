function configBuilder () {

    function isYes(option) {
        return option === 'Yes';
    }

    function buildNanocommitConfig(initOptions, packageFile) {
        const config = {};

        config.blindCommit = isYes(initOptions.blindCommit);

        console.log('Use existing test command: ', initOptions);
        if(isYes(initOptions.useExistingTestCommand)) {
            config.testCommand = packageFile.scripts.test;
        } else {
            config.testCommand = initOptions.newTestCommand;
        }

        if(isYes(initOptions.useDefaultCommitMessage)) {
            config.commitMessage = initOptions.defaultCommitMessage;
        } else {
            config.commitMessage = null;
        }

        return config;
    }
    
    function updatePackageFile(initOptions, config, packageFile) {
        if(isYes(initOptions.replaceNpmTest) && isYes(initOptions.installLocalInstance)) {
            packageFile.scripts.test = 'node ./node_modules/nanocommit/';
        } else if(isYes(initOptions.replaceNpmTest)) {
            packageFile.scripts.test = 'nanocommit';
        }

        packageFile.nanocommit = config;

        return packageFile;
    }

    function buildConfig(initOptions, packageFile) {
        const config = buildNanocommitConfig(initOptions, packageFile);

        return updatePackageFile(initOptions, config, packageFile);
    }

    return {
        buildConfig
    };
}

module.exports = configBuilder;