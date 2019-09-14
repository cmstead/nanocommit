function commitAnnotationTypes(
    configStore
) {

    const annotations = {};
    const customAnnotations = configStore
        .getConfig()
        .customAnnotations;

    annotations[buildAnnotationKey('nanocommit')] =
        {
            'Bug Fix': '[Bug]',
            'Code Refinement': '[Refinement]',
            'Comment (Add/Remove)': '[Comment]',
            'Configuration': '[Config]',
            'Documentation': '[Doc]',
            'Feature': '[Feature]',
            'Formatting': '[Formatting]',
            'Refactoring': '[Refactor]',
            'Refactoring (Automated)': '[Auto-Refactor]',
            'Unproven Refactoring': '[!Refactor]',
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


    if(typeof customAnnotations === 'object' && customAnnotations !== null) {
        annotations[buildAnnotationKey('custom')] = customAnnotations;
    }

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