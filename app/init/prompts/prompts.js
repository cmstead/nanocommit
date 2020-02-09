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

    function getCustomAnnotations() {
        const customAnnotations = {};

        function getNextAnnotation(resolve) {
            let tempKey;

            function getAnnotationKey() {
                return prompt
                    .displayPrompt(initPrompts.customAnnotationKey)
            }

            function getAnnotationValue() {
                return prompt
                    .displayPrompt(initPrompts.customAnnotationValue)
            }

            getAnnotationKey()
                .then(({ annotationKey }) => {
                    if (annotationKey !== '') {
                        tempKey = annotationKey;
                        return getAnnotationValue();
                    }
                })
                .then(function (data) {
                    if (data && data.annotationValue) {
                        customAnnotations[tempKey] = data.annotationValue;
                        getNextAnnotation(resolve);
                    } else {
                        resolve({ customAnnotations });
                    }
                });
        }

        return new Promise(getNextAnnotation);
    }

    function getWatchPaths() {
        let watchPaths = [];

        console.log('Nanocommit has a watch option, but it needs files configured to run the file watcher.');

        function getNextWatchPath(resolve) {
            prompt
                .displayPrompt(initPrompts.watchPath)
                .then(function(data) {
                    if(data.watchPath.trim() === ''){
                        resolve({ watchPaths });
                    } else {
                        watchPaths.push(data.watchPath);
                        getNextWatchPath(resolve);
                    }
                });
        }

        return new Promise(getNextWatchPath);
    }

    function conditionalGetCustomAnnotations(options) {
        return function () {
            if (options.useCommitAnnotations === 'custom') {
                return getCustomAnnotations();
            } else {
                return Promise.resolve({});
            }
        }
    }

    function playSound() {
        return prompt
            .displayPrompt(initPrompts.playSound);

    }

    return {
        conditionalGetCustomAnnotations,
        conditionalDefaultCommitMessage,
        conditionalTestOption,

        blindCommit,
        commitAnnotations,
        defaultCommandArgs,
        defaultCommitMessage,
        getCustomAnnotations,
        getTestCommand,
        getWatchPaths,
        installLocalInstance,
        playSound,
        replaceTestCommand,
        useExistingTest
    };
}

module.exports = prompts;