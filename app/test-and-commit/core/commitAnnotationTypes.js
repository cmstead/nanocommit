function commitAnnotationTypes() {

    const annotations = {};

    annotations[buildAnnotationKey('nanocommit')] =
        {
            'Bug Fix': '[Bug]',
            'Code Reorganization': '[Reorg]',
            'Comment (Add/Remove)': '[Comment]',
            'Documentation': '[Doc]',
            'Feature': '[Feature]',
            'Formatting': '[Formatting]',
            'Refactoring': '[Refactor]',
            'Test': '[Test]',
            'Unstable/Won\'t Run': '[!Unstable]',
            'Work In Progress': '[WIP]',
        };

    annotations[buildAnnotationKey('arlo')] =
        {
            'Feature': 'F',
            'Bug': 'B',
            'Comments (add/delete)': 'c',
            'Developer documentation changes (not end-user facing)': 'd',
            'Environment (non-code) changes': 'e',
            'Test only': 't',
            'Provable refactoring': 'r',
            'Automated formatting': 'a',
            'Non-provable refactoring': '!!!',
            'Does not compile intermediate step': '***'
        };


    function buildAnnotationKey(name) {
        return name + 'Prefixes';
    }

    function getAnnotationKey(name) {
        const testKey = buildAnnotationKey(name);
        const defaultKey = buildAnnotationKey('nanocommit');

        return Boolean(annotations[testKey])
            ? testKey
            : defaultKey;
    }

    function getAnnotationOptions(key) {
        return annotations[key];
    }

    return {
        buildAnnotationKey,
        getAnnotationKey,
        getAnnotationOptions
    };
}

module.exports = commitAnnotationTypes;