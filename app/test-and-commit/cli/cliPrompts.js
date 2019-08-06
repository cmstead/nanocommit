function cliPrompts(
    inquirer,
    promptUser
) {

    function addFile(fileName, callback) {
        const message = `Stage file, "${fileName}"? (Y/n) `;

        promptUser(message, callback);
    }

    function getCommitMessage(callback) {
        const message = 'What changes did you make? ';

        promptUser(message, callback);
    }

    function verifyCommitOnSpecialCase() {
        return inquirer
            .prompt([
                {
                    name: 'okToCommit',
                    message: 'Special test case run, do you want to commit?',
                    type: 'confirm',
                    default: false
                }
            ]);
    }

    return {
        addFile,
        getCommitMessage,
        verifyCommitOnSpecialCase
    }
}

module.exports = cliPrompts;