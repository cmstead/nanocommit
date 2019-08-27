function testAndCommit(
    changeCommitHelper,
    testRunner
) {

    return function (args) {

        try {
            testRunner.runTests(args);

            if(changeCommitHelper.changesExistToCommit()) {
                console.log('\n************ All tests passed, beginning commit! ************\n');
            } else {
                console.log('\n************ All tests passed, but there is nothing to commit ************\n');
            }

            if(args && args.length > 0) {
                changeCommitHelper.commitChangesOnApproval()
            } else {
                changeCommitHelper.commitChanges();
            }
        } catch (e) {
            console.log('[nanocommit] Tests failed, skipping commit.');
            console.log('[nanocommit] Error message: ', e.message);

            process.exit(1);
        }
    }
}

module.exports = testAndCommit;