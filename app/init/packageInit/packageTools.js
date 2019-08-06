function packageTools (
    fs,
    path
) {
    const packageLocation = path.join(
        process.cwd(),
        'package.json'
    );

    function loadPackageFile() {
        const packageFile = require(packageLocation);

        return packageFile;
    }

    function writePackageFile(packageObject) {
        const packageContent = JSON.stringify(packageObject, null, 4);

        fs.writeFileSync(packageLocation, packageContent);
    }

    return {
        loadPackageFile,
        writePackageFile
    };
}

module.exports = packageTools;