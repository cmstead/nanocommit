function watchAndCommit(
    chokidar,
    testAndCommit,
    optionsReader,
    watcherPrompts
) {

    function watchFiles() {
        
    }

    function startWatcher() {
        const options = optionsReader.readOptions();

        if(options.watchDirectories) {
            watcherPrompts
                .getCurrentTasks()
                .then(watchFiles);
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