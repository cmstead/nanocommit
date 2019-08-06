function commandArgsParser(
    cliOptions,
    commandLineArgs
) {

    function parseCommandArgs() {
        return commandLineArgs(cliOptions, { stopAtFirstUnknown: true })
    }

    return {
        parseCommandArgs
    }
}

module.exports = commandArgsParser;