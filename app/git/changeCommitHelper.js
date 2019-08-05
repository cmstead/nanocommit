function changeCommitHelper(
    commitActionFactory,
    commitMessageFactory,
    optionsReader,
    untrackedFileHelper
) {
    const options = optionsReader.readOptions();
    const commitAction = commitActionFactory.getCommitAction(options.blindCommit);

    function commitChanges() {
        commitMessageFactory.getCommitMessage(function (message) {
            commitAction(message);
        });
    }

    function changesExistToCommit() {
        const shortStatusTokens = untrackedFileHelper.getShortStatusTokens();

        return shortStatusTokens.length > 0
            && Boolean(shortStatusTokens[0]);
    }

    return {
        changesExistToCommit,
        commitChanges
    };
}

module.exports = changeCommitHelper;