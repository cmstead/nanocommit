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
        }
    ]
}

module.exports = cliOptions;