function testRunner(
    child_process,
    configStore
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

    function getTestCommand(options){
        return options !== null && typeof options === 'object'
            ? options.testCommand
            : '';
    }

    function buildTestCommand(args, options) {
        const baseCommand = getTestCommand(options);
        const commandArgs = getCommandArgs(args, options);
        return [baseCommand].concat(commandArgs).join(' ');
    }

    function runTests(args) {
        const options = configStore.getConfig();
        const testCommand = buildTestCommand(args, options);

        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }

    return {
        runTests: runTests
    }
}

module.exports = testRunner;