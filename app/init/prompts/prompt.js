function prompt (
    inquirer
) {
    
    function displayPrompt (promptValues) {
        return inquirer.prompt(promptValues);
    }

    return {
        displayPrompt
    };
}

module.exports = prompt;