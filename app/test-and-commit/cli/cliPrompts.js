function cliPrompts(promptUser) {
    function addFile(fileName, callback) {
        const message = `Stage file, "${fileName}"? (Y/n) `;

        promptUser(message, callback);
    }

    function getCommitMessage(callback) {
        const message = 'What changes did you make? ';

        promptUser(message, callback);
    }

    return {
        addFile: addFile,
        getCommitMessage: getCommitMessage
    }
}

module.exports = cliPrompts;