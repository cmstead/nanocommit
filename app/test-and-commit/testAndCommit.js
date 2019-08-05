function testAndCommit(
    changeCommitHelper,
    testRunner,
) {
    return function () {

        try {
            testRunner.runTests();

            changeCommitHelper.commitChanges();
        } catch (e) {
            console.log('Tests failed, skipping commit.');
            
            process.exit(1);
        }
    }
}

module.exports = testAndCommit;