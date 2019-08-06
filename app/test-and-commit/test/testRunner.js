function testRunner (
    child_process,
    optionsReader
) {
    const childProcess = child_process;
    const options = optionsReader.readOptions()

    function runTests(args) {
        const baseCommand = options.testCommand;
        const testCommand = [baseCommand].concat(args).join(' ');
    
        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }
    
    return {
        runTests: runTests
    }
}

module.exports = testRunner;