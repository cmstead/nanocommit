# nanocommit #

Nanocommit (properly, "nanocommit") is a tool which will commit your code for you when your tests pass.  This means you can work all day and, each time you run your commits, your work will be saved! (That's all it does.)

Currently, nanocommit is aimed at Node and Javascript packages which contain a package.json file.  If there is enough demand, I will extend functionality.

## Setup ##

### Installation ###

You can either install nanocommit globally:

```
npm install nanocommit -g
```
Or you can install it locally to a package:

```
npm install nanocommit --save-dev
```

### Configuration ###

Out of the box, nanocommit will run `npm test` when you call it.  If that is all you want, you're done.  If you want to reconfigure things a bit, you can configure nanocommit in your package.json file:

```json
{
    "scripts": {
        "test": "nanocommit"
    },
    "nanocommit": {
        "testCommand": "mocha ./spec/**/*.spec.js",
        "blindCommit": true,
        "commitMessage": "All tests passed"
    }
}
```

There are currently three options for configuration:

- **testCommit** -- The testCommit option defaults to `npm test` but will accept any terminal command you might use to run your tests.

- **blindCommit** -- The blindCommit default is "false." This option tells nanocommit whether you want to choose what is committed, or if you'd prefer everything be committed without user intervention.

- **commitMessage** -- The commitMessage default is `null`, requiring the user to enter a commit message. If a commit message is specified, nanocommit will not prompt for a commit message, instead using the message specified, appended with a date/time stamp.


