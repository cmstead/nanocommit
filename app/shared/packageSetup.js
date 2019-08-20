function packageSetup(
    child_process,
    configBuilder,
    packageTools
) {
    const childProcess = child_process;

    function isYes(option) {
        return option === 'Yes';
    }

    function updatePackageFile(initOptions, config, packageFile) {
        if (isYes(initOptions.replaceNpmTest) && isYes(initOptions.installLocalInstance)) {
            packageFile.scripts.test = 'node ./node_modules/nanocommit/';
        } else if (isYes(initOptions.replaceNpmTest)) {
            packageFile.scripts.test = 'nanocommit';
        }

        packageFile.nanocommit = config;

        return packageFile;
    }

    function doSetup(initOptions) {
        const packageFile = packageTools.loadPackageFile()
        const configObject = configBuilder.buildConfig(initOptions, packageFile);
        const packageObject = updatePackageFile(initOptions, configObject, packageFile);

        packageTools.writePackageFile(packageObject);

        if (initOptions.installLocalInstance === 'Yes') {
            childProcess.execSync('npm i nanocommit --save-dev', { stdio: 'inherit' });
        }
    }

    return {
        doSetup
    };
}

module.exports = packageSetup;