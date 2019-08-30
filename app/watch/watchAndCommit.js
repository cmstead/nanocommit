function watchAndCommit(
    chokidar,
    configStore,
    gitCommands,
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

        return runTestsAndCommit;
    }

    function buildCommitMessage(commitMessage) {
        const autocommitMessage = `[Autocommit][WIP] ${commitMessage}`;
        const options = configStore.getConfig();

        return options.autosquashable
            ? `squash! ${autocommitMessage}`
            : autocommitMessage;
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

    function watchForExit() {
        const options = configStore.getConfig();

        process.on('SIGINT', function () {
            if (options.autosquashable) {
                watcherPrompts
                    .runAutosquash(function (data) {
                        if (data.shouldAutosquash) {
                            gitCommands.autosquash();
                            process.exit();
                        }
                    });
            } else {
                process.exit();
            }
        });
    }

    return function startWatcher() {
        const options = configStore.getConfig();

        if (options.watchFiles) {
            watchForExit();

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