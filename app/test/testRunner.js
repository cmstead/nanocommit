function testRunner (
    child_process
) {
    const childProcess = child_process;

    function runTests(baseCommand, args) {
        const testCommand = [baseCommand].concat(args).join(' ');
    
        childProcess.execSync(testCommand, { stdio: 'inherit' });
    }
    
    return {
        runTests: runTests
    }
}

module.exports = testRunner;