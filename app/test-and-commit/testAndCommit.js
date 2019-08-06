function testAndCommit(
    changeCommitHelper,
    testRunner,
    inquirer
) {

    function commitChangesOnApproval() {
        inquirer
            .prompt([
                {
                    name: 'okToCommit',
                    message: 'Special test case run, do you want to commit?',
                    type: 'confirm'
                }
            ])
            .then(function(data) {
                if(data.okToCommit) {
                    changeCommitHelper.commitChanges();
                }
            });
    }

    return function (args) {

        try {
            testRunner.runTests(args);

            if(args.length > 0) {
                commitChangesOnApproval()
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