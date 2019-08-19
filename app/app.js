function app(
    commandArgsParser,
    commitOnly,
    help,
    init,
    testAndCommit
) {

    function startApp() {
        const commandArgs = commandArgsParser.parseCommandArgs();
        const isInitCommand = Boolean(commandArgs.init);
        const isHelpCommand = Boolean(commandArgs.help);
        const isCommitCommand = Boolean(commandArgs['commit-only']);
        const argValues = commandArgs._unknown;

        if (isHelpCommand) {
            help();
        } else if (isInitCommand) {
            init();
        } else if (isCommitCommand) {
            commitOnly()
        } else {
            testAndCommit(argValues);
        }
    }

    return {
        startApp
    };
}

module.exports = app;