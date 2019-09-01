function configBuilder (
    defaultConfig,
    optionsUtils
) {

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
        }

        config.blindCommit = isYes(initOptions.blindCommit);

        if(isYes(initOptions.useDefaultCommitMessage)) {
            config.commitMessage = initOptions.defaultCommitMessage;
        }

        if(initOptions.useCommitAnnotations.toLowerCase() !== 'none') {
            config.annotations = initOptions.useCommitAnnotations;
        }

        if(initOptions.useCommitAnnotations.toLowerCase() === 'custom') {
            config.customAnnotations = initOptions.customAnnotations;
        }

        config.watchFiles = initOptions.watchPaths;

        return optionsUtils.mergeOptions(config, defaultConfig);
    }
    
    return {
        buildConfig
    };
}

module.exports = configBuilder;