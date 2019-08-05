function untrackedFileHelper(gitCommands) {
    function getShortStatusTokens() {
        return gitCommands
            .getShortStatus()
            .split('\n');
    }

    function getUntrackedFilePaths(shortStatusTokens) {
        return shortStatusTokens
            .filter(token => /^\?\?/.test(token.trim()))
            .map(token => token.trim().slice(3));
    }

    function getUntrackedFiles() {
        const shortStatusTokens = getShortStatusTokens();
        return getUntrackedFilePaths(shortStatusTokens);
    }

    return {
        getShortStatusTokens: getShortStatusTokens,
        getUntrackedFiles: getUntrackedFiles
    }
}

module.exports = untrackedFileHelper;