function version(
    fs,
    path
) {

    return function () {
        const packagePath = path.join(
            __dirname,
            '../../package.json'
        );
        const packageFile = fs.readFileSync(packagePath, { encoding: 'utf8' });
        const packageObj = JSON.parse(packageFile);


        console.log(packageObj.version);
    };
}

module.exports = version;