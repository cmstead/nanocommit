function help () {
    
    function showHelp() {
        console.log('\n********** nanocommit help **********\n')
        console.log('Help documents are in development.');

        console.log('\n-- Setup: To set up nanocommit in your project, run `nanocommit --init`');
        console.log('-- Run Tests: To run tests, simply run `nanocommit`\n');
    }

    return showHelp;
}

module.exports = help;