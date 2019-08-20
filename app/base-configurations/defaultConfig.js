function defaultConfig () {
    return {
        testCommand: 'npm test',
        defaultCommandArgs: null,
        blindCommit: false,
        commitMessage: null,
        annotations: null,
        customAnnotations: [],
        watchFiles: []
    };
}

module.exports = defaultConfig;