function watchAndCommit(
    chokidar,
    configStore,
    testAndCommit,
    watcherPrompts
) {

    function runTestsAndCommit() {
        try {
            testAndCommit([]);
        } catch (e) {
            console.log('An error occurred while watching: ', e);
        }
    }

    function debouncedTestRunner(commitMessage) {
        let options = configStore.getConfig();

        options.blindCommit = true;
        options.commitMessage = commitMessage;
        options.annotations = null;

        configStore.setConfig(options);

        function testRunner () {
            runTestsAndCommit();
        }

        return testRunner;
    }

    function buildCommitMessage(commitMessage) {
        return `[Autocommit][WIP] ${commitMessage}`;
    }

    function watchFiles(options, commitMessage) {
        const watcher = chokidar.watch(options.watchFiles);
        const fullCommitMessage = buildCommitMessage(commitMessage);
        const testRunner = debouncedTestRunner(fullCommitMessage);

        testRunner();

        watcher.on('change', testRunner);
    }

    return function startWatcher() {
        const options = configStore.getConfig();

        if (options.watchFiles) {
            watcherPrompts
                .getCurrentTask()
                .then((data) => watchFiles(options, data.commitMessage));
        } else {
            console.log('No files configured for watch.');
            console.log('Try running `npx nanocommit --init` to add a configuration to your project.')
        }
    }
}

module.exports = watchAndCommit;