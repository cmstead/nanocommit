function init(
    packageSetup,
    prompts
) {

    function storeResults(results) {
        return function (data) {
            Object
                .keys(data)
                .forEach(function (key) {
                    results[key] = data[key];
                });

            return Promise.resolve(null);
        };
    }

    return function () {
        const results = {};
        const storeResult = storeResults(results);

        prompts.installLocalInstance()
            .then(storeResult)

            .then(prompts.useExistingTest)
            .then(storeResult)
            
            .then(() => prompts.conditionalTestOption(results))
            .then(storeResult)
            
            .then(prompts.defaultCommandArgs)
            .then(storeResult)
            
            .then(prompts.replaceTestCommand)
            .then(storeResult)
            
            .then(prompts.blindCommit)
            .then(storeResult)
            
            .then(prompts.defaultCommitMessage)
            .then(storeResult)

            .then(prompts.commitAnnotations)
            .then(storeResult)
            
            .then(() => prompts.conditionalDefaultCommitMessage(results))
            .then(storeResult)
            
            .then(() => packageSetup.doSetup(results))
            .catch((error) => console.log('Unable to complete setup', error));
    }
}

module.exports = init;