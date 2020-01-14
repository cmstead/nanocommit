function app(
    commandArgsParser,
    commitOnly,
    help,
    init,
    testAndCommit,
    testOnly,
    version,
    watchAndCommit
) {

    function startApp() {
        const commandArgs = commandArgsParser.parseCommandArgs();
        const argValues = commandArgs._unknown;

        const isInitCommand = Boolean(commandArgs.init);
        const isHelpCommand = Boolean(commandArgs.help);
        const isTestOnlyCommand = Boolean(commandArgs['test-only']);
        const isCommitCommand = Boolean(commandArgs['commit-only']);
        const isVersionCommand = Boolean(commandArgs['version']);
        const isWatchCommand = Boolean(commandArgs['watch']);

        if (isHelpCommand) {
            help();
        } else if(isTestOnlyCommand) {
            testOnly();
        } else if (isInitCommand) {
            init();
        } else if (isCommitCommand) {
            commitOnly();
        }else if(isVersionCommand) {
            version();
        }else if(isWatchCommand) {
            watchAndCommit();
        } else {
            testAndCommit(argValues);
        }
    }

    return {
        startApp
    };
}

module.exports = app;