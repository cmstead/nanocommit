function testRunner (
    child_process,
    optionsReader
) {
    const args = process.argv.slice(2);
    const childProcess = child_process;
    const options = optionsReader.readOptions()

    function runTests() {
        const baseCommand = options.testCommand;
        const testCommand = [baseCommand].concat(args).join(' ');
    
        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }
    
    return {
        runTests: runTests
    }
}

module.exports = testRunner;