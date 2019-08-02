const readline = require('readline');

function promptUser(message, callback) {
    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    lineReader.question(message, function (answer) {
        lineReader.close();

        callback(answer);
    })
}

module.exports = promptUser;