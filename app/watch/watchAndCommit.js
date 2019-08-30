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

    function watchForUnhandledErrors() {
        process.on('uncaughtException', function() {
            console.log('[nanocommit] An async test process failed, rerunning on next change.');
        });
    }

    function watchForExit() {
        const options = configStore.getConfig();

        process.on('SIGINT', function () {
            if (options.autosquashable) {
                const squashCount = gitCommands.getSquashCount();
                const squashCommand = `git rebase -i --autosquash HEAD~${squashCount + 1}`;

                console.log('To squash all watch-related commits, run the following command:');
                console.log(`\n${squashCommand}\n`);
            }

            process.exit();
        });
    }

    return function startWatcher() {
        const options = configStore.getConfig();

        if (options.watchFiles) {
            watchForUnhandledErrors();
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