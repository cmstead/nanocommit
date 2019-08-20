function defaultConfig () {
    return {
        testCommand: 'npm test',
        defaultCommandArgs: null,
        blindCommit: false,
        commitMessage: null,
        annotations: null,
        customAnnotations: null,
        watchFiles: null
    };
}

module.exports = defaultConfig;