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

    function getCommitAnnotation(annotationTypes) {
        return inquirer
            .prompt([
                {
                    name: 'commitAnnotation',
                    message: 'What are you committing?',
                    type: 'list',
                    choices: Object.keys(annotationTypes),
                    validate: (value) => value !== ''
                }
            ])
    }

    return {
        addFile,
        getCommitAnnotation,
        getCommitMessage,
        verifyCommitOnSpecialCase
    }
}

module.exports = cliPrompts;