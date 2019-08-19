function commitOnly(
    changeCommitHelper
) {

    return function () {
        changeCommitHelper.commitChanges();
    }
}

module.exports = commitOnly;