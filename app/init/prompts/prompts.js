function prompts(
    initPrompts,
    prompt
) {

    function installLocalInstance() {
        return prompt
            .displayPrompt(initPrompts.installLocalInstance);
    }

    function useExistingTest() {
        return prompt
            .displayPrompt(initPrompts.useExistingTest)
    }

    function conditionalTestOption(results) {
        if (results.useExistingTestCommand === 'No') {
            return prompt.displayPrompt(initPrompts.writeNewTestCommand);
        } else {
            return Promise.resolve({});
        }
    }

    function replaceTestCommand() {
        return prompt.displayPrompt(initPrompts.replaceTestCommand);
    }

    function blindCommit() {
        return prompt
            .displayPrompt(initPrompts.blindCommit);
    }

    function defaultCommitMessage() {
        return prompt
            .displayPrompt(initPrompts.useDefaultCommitMessage);
    }

    function conditionalDefaultCommitMessage(results) {
        if (results.useDefaultCommitMessage === 'Yes') {
            return prompt
                .displayPrompt(initPrompts.defaultCommitMessage);
        } else {
            return Promise.resolve({});
        }
    }

    return {
        conditionalDefaultCommitMessage,
        conditionalTestOption,

        blindCommit,
        defaultCommitMessage,
        installLocalInstance,
        replaceTestCommand,
        useExistingTest
    };
}

module.exports = prompts;