function commitActionFactory(
    cliPrompts,
    configStore,
    gitCommands,
    untrackedFileHelper
) {
    function promptForFileAdd(untrackedFiles, callback) {
        const currentFile = untrackedFiles.shift();

        function commitIfYesThenLoop(answer) {
            const answerIsYes = !/^no?$/.test(answer);

            if (answerIsYes) {
                gitCommands.addFile(currentFile);
            }

            addFileOnUserResponse(untrackedFiles, callback);
        }

        cliPrompts.addFile(currentFile, commitIfYesThenLoop);
    }

    function addFileOnUserResponse(untrackedFiles, callback) {
        if (untrackedFiles.length > 0) {
            promptForFileAdd(untrackedFiles, callback)
        } else {
            callback();
        }
    }

    function addUntrackedFiles(callback) {
        const untrackedFiles = untrackedFileHelper.getUntrackedFiles();
        addFileOnUserResponse(untrackedFiles, callback);
    }

    function selectiveCommit(message) {
        addUntrackedFiles(function () {
            gitCommands.patchCommit(message);
        });
    }

    function blindCommit(message) {
        gitCommands.addAllChanges();
        gitCommands.commitWithMessage(message);
    }

    function watchCommit(message) {
        const lastLogHash = gitCommands.getLastLogHash(message);

        gitCommands.addAllChanges();

        if(Boolean(lastLogHash)) {
            gitCommands.squashCommit(lastLogHash);
        } else {
            gitCommands.commitWithMessage(message);
        }
    }

    function getCommitAction() {
        console.log('getting commit action');
        const options = configStore.getConfig();

        if(options.isWatching) {
            return watchCommit;
        } else if(options.blindCommit) {
            return blindCommit;
        } else {
            return selectiveCommit;
        }
    }

    return {
        getCommitAction
    };
}

module.exports = commitActionFactory;