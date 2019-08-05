function promptUser (
    readline
) {
    return function (message, callback) {
        const lineReader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        lineReader.question(message, function (answer) {
            lineReader.close();
    
            callback(answer);
        })
    }
}

module.exports = promptUser;