function watchAndCommit(
    chokidar,
    configStore,
    testAndCommit,
    watcherPrompts
) {

    function runTestsAndCommit() {
        try {

        } catch (e) {
            console.log('An error occurred while watching: ', e);
        }
    }

    function debouncedTestRunner(commitMessage) {
        let running = false;
        let pending = false;
        let options = configStore.getConfig();

        options.blindCommit = true;
        options.commitMessage = commitMessage;

        configStore.setConfig(options);

        return function (config) {
            if (running) {
                pending = true;
            } else {
                running = true;

                do {
                    pending = false;

                    runTestsAndCommit([], config);
                } while (pending);

                running = false;
            }
        }
    }

    function watchFiles(options, commitMessage) {
        const watcher = chokidar.watch(options.watchFiles);

        watcher.on('all', debouncedTestRunner(commitMessage));
    }

    function startWatcher() {
        const options = configStore.getConfig();

        if (options.watchDirectories) {
            watcherPrompts
                .getCurrentTasks()
                .then((commitMessage) => watchFiles(options, commitMessage));
        } else {
            console.log('No files configured for watch.');
            console.log('Try running `npx nanocommit --init` to add a configuration to your project.')
        }
    }

    return {
        startWatcher
    };
}

module.exports = watchAndCommit;