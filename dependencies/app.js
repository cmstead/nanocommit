#!/usr/bin/env node

const commandActionFactory = require('./commit-action-factory');
const optionsReader = require('./options-reader');
const testRunner = require('./test-runnner');
const cliPrompts = require('./cli-prompts');
const localDate = require('./local-date');
const untrackedFileHelper = require('./untracked-file-helper');

const options = optionsReader.readOptions();
const args = process.argv.slice(2);
const shortStatusTokens = untrackedFileHelper.getShortStatusTokens();

const commitAction = commandActionFactory.getCommitAction(options.blindCommit);

function commitChanges() {
    if (typeof options.commitMessage === 'string') {
        const message = options.commitMessage
            + ' ' + localDate.getLocalDate();

        commitAction(message);
    } else {
        cliPrompts.getCommitMessage(function (message) {
            commitAction(message);
        });
    }
}


function app() {
    function testAndCommit() {

        try {
            testRunner.runTests(options.testCommand, args);

            if (
                shortStatusTokens.length > 0
                && Boolean(shortStatusTokens[0])
            ) {
                commitChanges();
            }
        } catch (e) {
            console.log('Tests failed, skipping commit.');
            process.exit(1);
        }
    }

    return {
        testAndCommit
    };
}

module.exports = app;