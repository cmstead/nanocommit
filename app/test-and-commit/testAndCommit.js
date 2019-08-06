function testAndCommit(
    changeCommitHelper,
    testRunner,
) {
    return function (args) {

        try {
            testRunner.runTests(args);

            changeCommitHelper.commitChanges();
        } catch (e) {
            console.log('Tests failed, skipping commit.');
            
            process.exit(1);
        }
    }
}

module.exports = testAndCommit;