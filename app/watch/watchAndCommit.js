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
        options.isWatching = true;

        configStore.setConfig(options);

        return runTestsAndCommit;
    }

    function buildCommitMessage(commitMessage) {
        const autocommitMessage = `[Autocommit][WIP] ${commitMessage}`;

        return autocommitMessage;
    }

    function watchFiles(options, commitMessage) {
        const watcher = chokidar.watch(options.watchFiles);
        const fullCommitMessage = buildCommitMessage(commitMessage);
        const testRunner = debouncedTestRunner(fullCommitMessage);

        try {
            testRunner();
        } catch (e) {
            console.log('[nanocommit] A test failed, rerunning on next change.');
        }

        watcher.on('change', testRunner);
    }

    function watchForUnhandledErrors() {
        process.on('uncaughtException', function() {
            console.log('[nanocommit] An async test process failed, rerunning on next change.');
        });
    }

    return function startWatcher() {
        const options = configStore.getConfig();

        if (options.watchFiles) {
            watchForUnhandledErrors();

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