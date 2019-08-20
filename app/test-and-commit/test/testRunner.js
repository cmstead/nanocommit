function testRunner(
    child_process,
    optionsReader
) {
    const childProcess = child_process;

    function getDefaultArgs(options) {
        return Boolean(options.defaultCommandArgs)
            ? options.defaultCommandArgs
            : [];
    }

    function getCommandArgs(args, options) {
        const argsWereProvided = Boolean(args) && args.length > 0;

        return !argsWereProvided
            ? getDefaultArgs(options)
            : args;
    }

    function buildTestCommand(args, options) {
        const baseCommand = options.testCommand;
        const commandArgs = getCommandArgs(args, options);
        return [baseCommand].concat(commandArgs).join(' ');
    }

    function optionsOrDefault(alternateOptions) {
        const userOptions = optionsReader.readOptions();

        return alternateOptions === null
            ? userOptions
            : optionsReader
                .mergeOptions(alternateOptions, userOptions);
    }

    function runTests(args, alternateOptions = null) {
        const options = optionsOrDefault(alternateOptions);
        const testCommand = buildTestCommand(args, options);

        console.log('Running tests: ' + testCommand);

        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }

    return {
        runTests: runTests
    }
}

module.exports = testRunner;