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

    function getTestCommand() {
        return prompt.displayPrompt(initPrompts.writeNewTestCommand);
    }

    function conditionalTestOption(results) {
        if (results.useExistingTestCommand === 'No') {
            return getTestCommand();
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

    function commitAnnotations() {
        return prompt
            .displayPrompt(initPrompts.useCommitAnnotations);
    }

    function conditionalDefaultCommitMessage(results) {
        if (results.useDefaultCommitMessage === 'Yes') {
            return prompt
                .displayPrompt(initPrompts.defaultCommitMessage);
        } else {
            return Promise.resolve({});
        }
    }

    function defaultCommandArgs() {
        console.log('\nDefault arguments are any arguments')
        console.log('which are usually included in a test run.')
        console.log('These arguments will be replaced when')
        console.log('other arguments are provided from the command line.\n')
        return prompt
            .displayPrompt(initPrompts.defaultCommandArgs);
    }

    return {
        conditionalDefaultCommitMessage,
        conditionalTestOption,

        blindCommit,
        commitAnnotations,
        defaultCommandArgs,
        defaultCommitMessage,
        getTestCommand,
        installLocalInstance,
        replaceTestCommand,
        useExistingTest
    };
}

module.exports = prompts;