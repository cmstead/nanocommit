
<!-- GENERATED DOCUMENT! DO NOT EDIT! -->
# nanocommit #


## Table Of Contents ##

- [Section 1: Why nanocommit?](#user-content-why-nanocommit?)
- [Section 2: Setting Up nanocommit](#user-content-setting-up-nanocommit)
- [Section 3: Running Nanocommit](#user-content-running-nanocommit)

## Why nanocommit? ##

Nanocommit (properly, "nanocommit") is a tool which will commit your code for you when your tests pass.  This means you can work all day and, each time you run your commits, your work will be saved! (That's all it does.)

Currently, nanocommit is aimed at Node and Javascript packages which contain a package.json file.  If there is enough demand, I will extend functionality.
    

## Setting Up nanocommit ##


#### Installation ####

Easiest setup: For one-time menu-driven package-level installation, run the following command:

```
npx nanocommit --init
```

The above command will set up the configuration you need in your package to use nanocommit, and will install the package locally for you. The menu system should be straightforward.  If you have any feedback, please submit it to the nanocommit github issues board.


You can either install nanocommit globally:

```
npm install nanocommit -g
```

Or you can install it locally to a package:

```
npm install nanocommit --save-dev
```
    

#### Configuration ####

**Note**

If you ran `npx nanocommit --init` and chose to install nanocommit locally, you don't need to do any other configuration.

**Everyone else:**

If you installed nanocommit globally, run the following command and follow the prompts:

```
nanocommit --init
```

**Configuration By Hand**

This is not recommended. Please use --init unless you really, really know what you intend to do.
    

#### Configuration Options ####

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
    
    

## Running Nanocommit ##


### Nanocommit Basics ###

It is possible to run nanocommit in a couple different ways: locally and as a global script.

When nanocommit is installed locally, run this from your package root:

```
node ./node_modules/nanocommit/
```

If nanocommit is installed and configured to run from the `npm test` command, you can pass flags through like the following example:

**Important note: the ` -- ` is required by npm. Don't forget to include it!**

```
npm test -- --test-only
```

If nanocommit is installed globally, just run this:

```
nanocommit
```
    

### Nanocommit Flags ###

All flags for nanocommit are simply standalone and accept no arguments.  Currently the following are supported:

- `nanocommit --help` -- This will display help information about nanocommit and a very simple explanation of how to run it.

- `nanocommit --init` -- This will initialize your project with a nanocommit configuration.  The configuration will reside in your `package.json` file if you have one, otherwise it will exist in a standalone file called `.nanocommit.conf.json`.

- `nanocommit --commit-only` -- This will run just the commit portion of the nanocommit run, skipping the testing phase.  This is especially helpful if you either have no tests currently (sad face), you ran the tests and just want the tag annotations, or you are committing changes which are not necessarily part of the production code.

- `nanocommit --test-only` -- This will run just the test portion of the nanocommit run, skipping the commit phase.  This is especially helpful when you want to just run tests and get an output (like in a deployment situation).

- `nanocommit --watch` -- Watches files in configuration, reruns tests and commits when tests pass.
    
    

<!-- GENERATED DOCUMENT! DO NOT EDIT! -->
    