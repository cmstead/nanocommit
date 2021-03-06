<!--bl
    (filemeta
        (title "Nanocommit Basics")
    )
/bl-->

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