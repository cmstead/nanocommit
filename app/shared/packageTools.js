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

    function doesPackageFileExist() {
        try{
            fs.lstatSync(packageLocation);
            return true;
        } catch (e) {
            return false;
        }
    }

    return {
        packageLocation,
        
        doesPackageFileExist,
        loadPackageFile,
        writePackageFile
    };
}

module.exports = packageTools;