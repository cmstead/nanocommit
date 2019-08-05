function app(
    changeCommitHelper,
    optionsReader,
    testRunner,
) {
    const options = optionsReader.readOptions();
    const args = process.argv.slice(2);

    function testAndCommit() {

        try {
            testRunner.runTests(options.testCommand, args);

            if (changeCommitHelper.changesExistToCommit()) {
                changeCommitHelper.commitChanges();
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