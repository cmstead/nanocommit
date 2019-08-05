function commitMessageFactory(
    cliPrompts,
    localDate,
    optionsReader
) {
    const options = optionsReader.readOptions();

    function getMessageFromOptions(callback) {
        const message = options.commitMessage
            + ' ' + localDate.getLocalDate();

        callback(message);
    }

    function getMessageFromUser(callback) {
        cliPrompts.getCommitMessage(function (message) {
            callback(message);
        });
    }

    function hasDefaultMessage() {
        return typeof options.commitMessage === 'string';
    }

    function getCommitMessage(callback) {
        const getMessageAction = hasDefaultMessage()
            ? getMessageFromOptions
            : getMessageFromUser;

        getMessageAction(callback);
    }

    return {
        getCommitMessage
    }
}

module.exports = commitMessageFactory;