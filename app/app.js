function app(
    changeCommitHelper,
    testRunner,
) {
    function testAndCommit() {

        try {
            testRunner.runTests();

            changeCommitHelper.commitChanges();
        } catch (e) {
            console.log('Tests failed, skipping commit.');
            
            process.exit(1);
        }
    }

    return {
        testAndCommit
    };
}

module.exports = app;