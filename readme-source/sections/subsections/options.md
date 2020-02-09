<!--bl
    (filemeta
        (title "Configuration Options")
    )
/bl-->

Below is an example of a nanocommit configuration in the package.json file. This will generally be generated, but can be edited by hand.


```json
{
    ...
    "nanocommit": {
        "testCommand": "mocha ./spec/**/*.spec.js",
        "defaultCommandArgs": null,
        "blindCommit": true,
        "commitMessage": "All tests passed",
        "annotations": null
    }
    ...
}
```

The following is a stand-alone nanocommit config (.nanocommit.config.json). This will only be read if there is no package.json file in your project. The standalone configuration is ideal for non-javascript projects.

```json
{
    "testCommand": "npm run test-and-build",
    "defaultCommandArgs": null,
    "blindCommit": true,
    "commitMessage": null,
    "annotations": "nanocommit",
    "watchFiles": [
        "./app/**/*.js"
    ],
    "customAnnotations": null,
    "playSound": true
}
```


Following are the configuration options. It is advisable to simply run `nanocommit --init`, or `npx nanocommit --init` to set these options instead of configuring by hand.

- **testCommand** -- The testCommand option defaults to `npm test` but will accept any terminal command you might use to run your tests.

- **defaultCommandArgs** -- An array of arguments which are typically passed to the test command.  If arguments are supplied via the CLI, they will replace the default command args.

- **blindCommit** -- The blindCommit default is "false." This option tells nanocommit whether you want to choose what is committed, or if you'd prefer everything be committed without user intervention.

- **commitMessage** -- The commitMessage default is `null`, requiring the user to enter a commit message. If a commit message is specified, nanocommit will not prompt for a commit message, instead using the message specified, appended with a date/time stamp.

- **annotations** -- There are two options for automated commit message annotations: nanocommit and arlo.  Nanocommit annotations are in brackets and contain common words or abbreviations, e.g. `[doc]` for documentation.  Arlo style annotations reflect Arlo Belshee's annotation list, found in his github repo: https://github.com/arlobelshee/ArlosCommitNotation

- **watchFiles** -- An array of glob patterns for files to watch and retest on.

- **playSound** -- Play a bell ringing sound when tests pass