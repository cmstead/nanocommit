function testRunner(
    child_process,
    optionsReader
) {
    const childProcess = child_process;
    const options = optionsReader.readOptions()

    function getDefaultArgs() {
        return Boolean(options.defaultCommandArgs)
            ? options.defaultCommandArgs
            : [];
    }

    function getCommandArgs(args) {
        const argsWereProvided = Boolean(args) && args.length > 0;

        return !argsWereProvided
            ? getDefaultArgs()
            : args;
    }

    function runTests(args) {
        const baseCommand = options.testCommand;
        const commandArgs = getCommandArgs(args);
        const testCommand = [baseCommand].concat(commandArgs).join(' ');

        console.log('Running tests: ' + testCommand);

        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }

    return {
        runTests: runTests
    }
}

module.exports = testRunner;