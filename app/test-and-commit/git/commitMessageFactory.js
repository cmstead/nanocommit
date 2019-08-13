function commitMessageFactory(
    cliPrompts,
    commitAnnotationTypes,
    localDate,
    optionsReader
) {
    const options = optionsReader.readOptions();

    function getMessageFromOptions(callback) {
        const message = options.commitMessage
            + ' ' + localDate.getLocalDate();

        callback(message);
    }

    function getAnnotationOptions() {
        const annotationKey = commitAnnotationTypes
            .getAnnotationKey(options.annotations);

        return commitAnnotationTypes
            .getAnnotationOptions(annotationKey);
    }

    function getCommitAnnotation(callback) {
        const annotationOptions = getAnnotationOptions();
        cliPrompts
            .getCommitAnnotation(annotationOptions)
            .then(function (data) {
                const selectedAnnotation = data.commitAnnotation;
                const annotationString = annotationOptions[selectedAnnotation];

                callback(annotationString + ' ');
            });
    };

    function getMessageFromUser(callback) {
        cliPrompts.getCommitMessage(function (message) {
            callback(message);
        });
    }

    function hasDefaultMessage() {
        return typeof options.commitMessage === 'string';
    }

    function prepareAnnotation(callback) {
        if (options.annotations !== null) {
            getCommitAnnotation(function (annotation) {
                callback(annotation);
            });
        } else {
            callback('');
        }

    }

    function getCommitMessage(callback) {
        const getMessageAction = hasDefaultMessage()
            ? getMessageFromOptions
            : getMessageFromUser;

        prepareAnnotation(function (annotation) {
            getMessageAction(function (commitMessage) {
                callback(annotation + commitMessage);
            });
        });
    }

    return {
        getCommitMessage
    }
}

module.exports = commitMessageFactory;