function help () {
    
    function showHelp() {
        console.log('\n********** nanocommit help **********\n')

        console.log('Usage: nanocommit [options]\n');

        console.log('Options:\n');

        console.log('--commit-only : commit code without a test run');
        console.log('--init : set up nanocommit in your project');
        console.log('--test-only : run all tests, skip the commit phase')
        console.log('--watch : watch files -- on change, test and commit');
        
        console.log('');
    }

    return showHelp;
}

module.exports = help;