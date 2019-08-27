function app(
    commandArgsParser,
    commitOnly,
    help,
    init,
    testAndCommit,
    version,
    watchAndCommit
) {

    function startApp() {
        const commandArgs = commandArgsParser.parseCommandArgs();
        const argValues = commandArgs._unknown;

        const isInitCommand = Boolean(commandArgs.init);
        const isHelpCommand = Boolean(commandArgs.help);
        const isCommitCommand = Boolean(commandArgs['commit-only']);
        const isVersionCommand = Boolean(commandArgs['version']);
        const isWatchCommand = Boolean(commandArgs['watch']);

        if (isHelpCommand) {
            help();
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