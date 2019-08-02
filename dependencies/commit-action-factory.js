const gitCommands = require('./git-commands');
const cliPrompts = require('./cli-prompts');
const untrackedFileHelper = require('./untracked-file-helper');


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

function getCommitAction(isBlindCommit) {
    return isBlindCommit
        ? blindCommit
        : selectiveCommit;
}

module.exports = {
    getCommitAction
};