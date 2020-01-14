function testOnly (testRunner) {
    

    return function (args) {
        testRunner.runTests(args);
    };
}

module.exports = testOnly;