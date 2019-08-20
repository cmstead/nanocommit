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

    function debouncedTestRunner(commitMessage, eventName) {
        let options = configStore.getConfig();

        options.blindCommit = true;
        options.commitMessage = commitMessage;
        options.annotations = null;

        configStore.setConfig(options);

        return function () {
            console.log(`------------------- ${eventName} --------------------`);
            runTestsAndCommit();
        }
    }

    function watchFiles(options, commitMessage) {
        console.log('Starting watcher');
        const watcher = chokidar.watch(options.watchFiles);

        watcher
            .on('add', debouncedTestRunner(commitMessage, 'add'))
            .on('change', debouncedTestRunner(commitMessage, 'change'))
            .on('delete', debouncedTestRunner(commitMessage, 'delete'));
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