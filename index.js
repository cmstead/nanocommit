const commandActionFactory = require('./dependencies/commit-action-factory');
const optionsReader = require('./dependencies/options-reader');
const testRunner = require('./dependencies/test-runnner');
const cliPrompts = require('./dependencies/cli-prompts');

const options = optionsReader.readOptions();
const args = process.argv.slice(2);

const commitAction = commandActionFactory.getCommitAction(options.blindCommit);

try{
    testRunner.runTests(options.testCommand, args);

    cliPrompts.getCommitMessage(function(message) {
        commitAction(message);
    });
} catch (e) {
    console.log('Tests failed, skipping commit.');
    process.exit(1);
}