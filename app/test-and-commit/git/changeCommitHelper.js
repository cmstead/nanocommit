function changeCommitHelper(
    commitActionFactory,
    commitMessageFactory,
    untrackedFileHelper
) {
    const commitAction = commitActionFactory.getCommitAction();
    const shortStatusTokens = untrackedFileHelper.getShortStatusTokens();

    function changesExistToCommit() {
        return shortStatusTokens.length > 0
            && Boolean(shortStatusTokens[0]);
    }

    function commitChanges() {
        if (changesExistToCommit()) {
            commitMessageFactory
                .getCommitMessage(commitAction);
        }
    }

    return {
        commitChanges
    };
}

module.exports = changeCommitHelper;