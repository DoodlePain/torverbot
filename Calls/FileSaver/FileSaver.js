const fs = require('fs');

exports.checkAndWrite = (response, utf8String, path) => {
    // File module
    if (response == undefined || response.statusCode != '200') {
        console.log("Huston, we've got some problems... \nThe site is offline!");
        utf8String = fs.readFileSync(path, 'utf8')
    } else {
        fs.writeFile(path, utf8String, function (err) {
            if (err) throw err;
        });
    }
    utf8String = utf8String.replace(/&nbsp;/gi, " ")
    utf8String = utf8String.replace('null', ' ')
    // File module end
    return utf8String;
}