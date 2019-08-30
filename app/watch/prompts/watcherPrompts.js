function watcherPrompts (
    inquirer
) {
    
    function getCurrentTask() {
        return inquirer.prompt([
            {
                name: 'commitMessage',
                message: 'What are you working on?',
                type: 'input'
            }
        ]);
    }

    function runAutosquash() {
        return inquirer.prompt([
            {
                name: 'shouldAutosquash',
                message: 'Do you want to run autosquash now?',
                type: 'confirm',
                default: true
            }
        ])
    }

    return {
        getCurrentTask,
        runAutosquash
    };
}

module.exports = watcherPrompts;