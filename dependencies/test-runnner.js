const childProcess = require('child_process');

function runTests(baseCommand, args) {
    const testCommand = [baseCommand].concat(args).join(' ');

    childProcess.execSync(testCommand, { stdio: 'inherit' });
}

module.exports = {
    runTests: runTests
}