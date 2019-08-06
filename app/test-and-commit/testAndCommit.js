function testAndCommit(
    changeCommitHelper,
    testRunner
) {

    return function (args) {

        try {
            testRunner.runTests(args);

            if(args && args.length > 0) {
                changeCommitHelper.commitChangesOnApproval()
            } else {
                changeCommitHelper.commitChanges();
            }
        } catch (e) {
            console.log('Tests failed, skipping commit.');

            process.exit(1);
        }
    }
}

module.exports = testAndCommit;