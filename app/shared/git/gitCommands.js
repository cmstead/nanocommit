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

    function getSquashCount() {
        const command = 'git log --oneline -50';

        return childProcess
            .execSync(command, { encoding: 'utf8' })
            .split('\n')
            .filter((log) => /squash\!/.test(log))
            .length;
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getLastLogHash(message) {
        const command = 'git log --oneline';
        const messagePattern = new RegExp(escapeRegex(message));
        const lastLogMessage = childProcess
            .execSync(command, { encoding: 'utf8' })
            .split('\n')[0];

        return messagePattern.test(lastLogMessage)
            ? lastLogMessage.split(' ')[0]
            : null;
    }

    function squashCommit(hash) {
        const command = `git commit --squash ${hashƒ}`;

        childProcess.execSync(command, { stdio: 'inherit' });
    }

    return {
        addAllChanges: addAllChanges,
        addFile: addFile,
        commitWithMessage: commitWithMessage,
        getLastLogHash: getLastLogHash,
        getShortStatus: getShortStatus,
        getSquashCount: getSquashCount,
        patchCommit: patchCommit,
        squashCommit: squashCommit
    }

}

module.exports = gitCommands;