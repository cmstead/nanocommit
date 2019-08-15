function configBuilder () {

    function isYes(option) {
        return option === 'Yes';
    }

    function buildConfig(initOptions, packageFile) {
        const config = {};

        if(isYes(initOptions.useExistingTestCommand)) {
            config.testCommand = packageFile.scripts.test;
        } else {
            config.testCommand = initOptions.newTestCommand;
        }

        if(isYes(initOptions.defaultCommandArgs)) {
            config.defaultCommandArgs = initOptions.defaultCommandArgs.split(' ');
        } else {
            config.defaultCommandArgs = null;
        }

        config.blindCommit = isYes(initOptions.blindCommit);

        if(isYes(initOptions.useDefaultCommitMessage)) {
            config.commitMessage = initOptions.defaultCommitMessage;
        } else {
            config.commitMessage = null;
        }

        if(initOptions.useCommitAnnotations.toLowerCase() !== 'none') {
            config.annotations = initOptions.useCommitAnnotations;
        } else {
            config.annotations = null;
        }

        if(initOptions.useCommitAnnotations.toLowerCase() === 'custom') {
            config.customAnnotations = initOptions.customAnnotations;
        }

        return config;
    }
    
    return {
        buildConfig
    };
}

module.exports = configBuilder;