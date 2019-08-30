function gitCommands(child_process) {
    const childProcess = child_process;

    const shortStatus = 'git status --short';
    const patchCommitCommand = 'git commit --patch -m "{message}"';
    const addFileCommand = 'git add "{filepath}"';
    const addAll = 'git add --all';
    const commit = 'git commit -m "{message}"';

    function getShortStatus() {
        return childProcess
            .execSync(shortStatus, { encoding: 'utf8' });
    }

    function patchCommit(commitMessage) {
        const command = patchCommitCommand
            .replace('{message}', commitMessage);

        childProcess.execSync(command, { stdio: 'inherit' });
    }

    function addFile(filepath) {
        const command = addFileCommand.replace('{filepath}', filepath);

        childProcess.execSync(command);
    }

    function addAllChanges() {
        childProcess.execSync(addAll, { stdio: 'inherit' });
    }

    function commitWithMessage(message) {
        const commitCommand = commit.replace('{message}', message);

        childProcess.execSync(commitCommand, { stdio: 'inherit' });
    }

    function autosquash() {
        const command = 'git rebase --interactive --autosquash';

        childProcess.execSync(command, { stdio: 'inherit' });
    }

    return {
        addAllChanges: addAllChanges,
        addFile: addFile,
        autosquash: autosquash,
        commitWithMessage: commitWithMessage,
        getShortStatus: getShortStatus,
        patchCommit: patchCommit
    }

}

module.exports = gitCommands;