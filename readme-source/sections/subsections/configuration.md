<!--bl
    (filemeta
        (title "Configuration")
    )
/bl-->

**Note**

You can skip this if you used the `nanocommit --init` setup method

**Everyone else:**

Out of the box, nanocommit will run `npm test` when you call it.  If that is all you want, you're done.  If you want to reconfigure things a bit, you can configure nanocommit in your package.json file:

This is a configuration with nanocommit installed globally:

```json
{
    "scripts": {
        "test": "nanocommit"
    },
    "nanocommit": {
        "testCommand": "mocha ./spec/**/*.spec.js",
        "defaultCommandArgs": null,
        "blindCommit": true,
        "commitMessage": "All tests passed",
        "annotations": null
    }
}
```

This is a configuration with nanocommit installed locally:

```json
{
    "scripts": {
        "test": "node ./node_modules/nanocommit/"
    },
    "nanocommit": {
        "testCommand": "mocha ./spec/**/*.spec.js",
        "defaultCommandArgs": null,
        "blindCommit": true,
        "commitMessage": "All tests passed",
        "annotations": null
    }
}
```