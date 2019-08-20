function cliOptions() {
    return [
        {
            name: 'help',
            alias: 'h',
            type: Boolean
        },
        {
            name: 'init',
            type: Boolean
        },
        {
            name: 'commit-only',
            alias: 'c',
            type: Boolean
        },
        {
            name: 'watch',
            type: Boolean
        }
    ]
}

module.exports = cliOptions;