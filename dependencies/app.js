function app(
    cliPrompts,
    commitActionFactory,
    localDate,
    optionsReader,
    testRunner,
    untrackedFileHelper
) {
    const options = optionsReader.readOptions();
    const args = process.argv.slice(2);
    const shortStatusTokens = untrackedFileHelper.getShortStatusTokens();

    const commitAction = commitActionFactory.getCommitAction(options.blindCommit);

    function commitChanges() {
        if (typeof options.commitMessage === 'string') {
            const message = options.commitMessage
                + ' ' + localDate.getLocalDate();

            commitAction(message);
        } else {
            cliPrompts.getCommitMessage(function (message) {
                commitAction(message);
            });
        }
    }

    function testAndCommit() {

        try {
            testRunner.runTests(options.testCommand, args);

            if (
                shortStatusTokens.length > 0
                && Boolean(shortStatusTokens[0])
            ) {
                commitChanges();
            }
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