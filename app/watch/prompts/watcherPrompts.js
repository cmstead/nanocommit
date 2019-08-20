function watcherPrompts (
    inquirer
) {
    
    function getCurrentTask() {
        return inquirer.prompt([
            {
                name: 'commitMessage',
                description: 'What are you working on?',
                type: 'input'
            }
        ]);
    }

    return {
        getCurrentTask
    };
}

module.exports = watcherPrompts;