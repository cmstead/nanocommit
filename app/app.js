function app(
    commandArgsParser,
    help,
    init,
    testAndCommit
) {

    function startApp() {
        const commandArgs = commandArgsParser.parseCommandArgs();
        const isInitCommand = Boolean(commandArgs.init);
        const isHelpCommand = Boolean(commandArgs.help);
        const argValues = commandArgs._unknown;

        if(isHelpCommand) {
            help();
        } else if(isInitCommand) {
            init();
        } else {
            testAndCommit(argValues);
        }
    }

    return {
        startApp
    };
}

module.exports = app;