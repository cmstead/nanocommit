function packageSetup (
    child_process,
    configBuilder,
    packageTools
) {
    const childProcess = child_process;

    function doSetup(initOptions) {
        const packageFile = packageTools.loadPackageFile()
        const packageObject = configBuilder.buildConfig(initOptions, packageFile);

        packageTools.writePackageFile(packageObject);

        if(initOptions.installLocalInstance === 'Yes') {
            childProcess.execSync('npm i nanocommit --save-dev', { stdio: 'inherit' });
        }
    }

    return {
        doSetup
    };
}

module.exports = packageSetup;