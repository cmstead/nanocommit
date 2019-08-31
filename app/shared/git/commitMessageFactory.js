function commitMessageFactory(
    cliPrompts,
    configStore,
    commitAnnotationTypes,
    localDate
) {
    function getMessageFromOptions(options, callback) {
        const message = options.commitMessage
            + ' ' + localDate.getLocalDate();

        callback(message);
    }

    function getAnnotationOptions(options) {
        const annotationKey = commitAnnotationTypes
            .getAnnotationKey(options.annotations);

        return commitAnnotationTypes
            .getAnnotationOptions(annotationKey);
    }

    function getCommitAnnotation(options, callback) {
        const annotationOptions = getAnnotationOptions(options);
        cliPrompts
            .getCommitAnnotation(annotationOptions)
            .then(function (data) {
                const selectedAnnotation = data.commitAnnotation;
                const annotationString = annotationOptions[selectedAnnotation];

                callback(annotationString + ' ');
            });
    };

    function getMessageFromUser(options, callback) {
        cliPrompts.getCommitMessage(function (message) {
            callback(message);
        });
    }

    function hasDefaultMessage(options) {
        return typeof options.commitMessage === 'string';
    }

    function prepareAnnotation(options, callback) {
        if (options.annotations !== null) {
            getCommitAnnotation(options, function (annotation) {
                callback(annotation);
            });
        } else {
            callback('');
        }

    }

    function returnCommitMessage(options, callback) {
        callback(options.commitMessage);
    }

    function getCommitMessage(callback) {
        const options = configStore.getConfig();
        let getMessageAction;

        if(hasDefaultMessage(options) && options.isWatching) {
            getMessageAction = returnCommitMessage;
        } else if(hasDefaultMessage(options)) {
            getMessageAction = getMessageFromOptions;
        } else {
            getMessageAction = getMessageFromUser;
        }

        prepareAnnotation(options, function (annotation) {
            getMessageAction(options, function (commitMessage) {
                callback(annotation + commitMessage);
            });
        });
    }

    return {
        getCommitMessage
    }
}

module.exports = commitMessageFactory;