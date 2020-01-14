<!--bl
    (filemeta
        (title "Nanocommit Flags")
    )
/bl-->

All flags for nanocommit are simply standalone and accept no arguments.  Currently the following are supported:

- `nanocommit --help` -- This will display help information about nanocommit and a very simple explanation of how to run it.

- `nanocommit --init` -- This will initialize your project with a nanocommit configuration.  The configuration will reside in your `package.json` file if you have one, otherwise it will exist in a standalone file called `.nanocommit.conf.json`.

- `nanocommit --commit-only` -- This will run just the commit portion of the nanocommit run, skipping the testing phase.  This is especially helpful if you either have no tests currently (sad face), you ran the tests and just want the tag annotations, or you are committing changes which are not necessarily part of the production code.

- `nanocommit --test-only` -- This will run just the test portion of the nanocommit run, skipping the commit phase.  This is especially helpful when you want to just run tests and get an output (like in a deployment situation).

- `nanocommit --watch` -- Watches files in configuration, reruns tests and commits when tests pass.