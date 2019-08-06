function initPrompts() {

    function yesNoListFactory(name, message, defaultValue = 'Yes') {
        return {
            name: name,
            message: message,
            type: 'list',
            choices: ['Yes', 'No'],
            default: defaultValue
        };
    }

    const installLocalInstance = [
        yesNoListFactory(
            'installLocalInstance',
            'Install nanocommit in your local project?'
        )
    ];

    const useExistingTest = [
        yesNoListFactory(
            'useExistingTestCommand',
            'Use existing test command?'
        )
    ];

    const replaceTestCommand = [
        yesNoListFactory(
            'replaceNpmTest',
            'Replace npm test command with nanocommit?'
        )
    ];

    const writeNewTestCommand = [
        {
            name: 'newTestCommand',
            message: 'Write a new test command:',
            type: 'input'
        }
    ];

    const blindCommit = [
        yesNoListFactory(
            'blindCommit',
            'Commit all files without confirmation?',
            'No'
        )
    ];

    const useDefaultCommitMessage = [
        yesNoListFactory(
            'useDefaultCommitMessage',
            'Commit all files automatically with default message?',
            'No'
        )
    ];

    const defaultCommitMessage = [
        {
            name: 'defaultCommitMessage',
            message: 'Write a default commit message:',
            type: 'input'
        }
    ];

    return {
        installLocalInstance,
        useExistingTest,
        replaceTestCommand,
        writeNewTestCommand,
        blindCommit,
        useDefaultCommitMessage,
        defaultCommitMessage
    };
}

module.exports = initPrompts;