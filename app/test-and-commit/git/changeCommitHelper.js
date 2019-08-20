function changeCommitHelper(
    cliPrompts,
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

    function commitChangesOnApproval() {
        cliPrompts
            .verifyCommitOnSpecialCase()
            .then(function (data) {
                if (data.okToCommit) {
                    commitChanges();
                }
            });
    }

    return {
        changesExistToCommit,
        commitChanges,
        commitChangesOnApproval
    };
}

module.exports = changeCommitHelper;