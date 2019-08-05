function commitMessageFactory(
    cliPrompts,
    localDate,
    optionsReader
) {
    const options = optionsReader.readOptions();
    
    function getCommitMessage(callback) {
        if (typeof options.commitMessage === 'string') {
            const message = options.commitMessage
                + ' ' + localDate.getLocalDate();

            callback(message);
        } else {
            cliPrompts.getCommitMessage(function (message) {
                callback(message);
            });
        }
    }

    return {
        getCommitMessage
    }
}

module.exports = commitMessageFactory;