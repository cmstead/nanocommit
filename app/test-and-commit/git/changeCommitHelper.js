function changeCommitHelper(
    cliPrompts,
    commitActionFactory,
    commitMessageFactory,
    untrackedFileHelper
) {

    function changesExistToCommit() {
        const shortStatusTokens = untrackedFileHelper.getShortStatusTokens();

        return shortStatusTokens.length > 0
            && Boolean(shortStatusTokens[0]);
    }

    function commitChanges() {
        const commitAction = commitActionFactory.getCommitAction();

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