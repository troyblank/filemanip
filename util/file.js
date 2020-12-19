const fs = require('fs-extra');
const path = require('path');

exports.getFileNameFromPath = (filename) => {
    return path.parse(filename).base
}

exports.exists = function(filename) {
    if (fs.existsSync(filename)) {
        return true;
    }

    return false;
}

exports.deleteFile = function(filename) {
    if (exports.exists(filename)) {
        fs.unlinkSync(filename);
    }
}

exports.deleteFiles = function(filenames, handler) {
    for(var i = 0; i < filenames.length; i++) {
        exports.deleteFile(filenames[i]);
    }
    handler.call();
}

exports.copyFile = function(filename) {
    const currentDir = process.cwd()

    fs.copySync(filename, `${currentDir}/${exports.getFileNameFromPath(filename)}`)
}

exports.copyFiles = async (filenames) => {
    filenames.forEach(async (filename) => {
        await exports.copyFile(filename)
    })
}

exports.takeFilesOutOfDir = function(filenames, directory, handler) {
    for(var i = 0; i < filenames.length; i++) {
        fs.renameSync(directory + filenames[i], filenames[i])
    }
    handler.call();
}

exports.getFilesInRemoteDir = function(recursive, directory) {
        fileNames = [];

    var files = fs.readdirSync(directory);
    for (var i=0; i<files.length; i++) {
        var file = directory ? directory + '\/' + files[i] : files[i];

        if (fs.statSync(file).isFile()) {
            fileNames.push(file);
        }

        if(recursive && fs.statSync(file).isDirectory()) {
            fileNames = fileNames.concat(exports.getFilesInRemoteDir(recursive, file));
        }
    }

    return fileNames;
}

exports.getFilesInDir = function(recursive, subDir) {
    var dir = subDir ? process.cwd() + '\/' + subDir : process.cwd(),
        fileNames = [];

    var files = fs.readdirSync(dir);
    for (var i=0; i<files.length; i++) {
        var file = subDir ? subDir + '\/' + files[i] : files[i];

        if (fs.statSync(file).isFile()) {
            fileNames.push(file);
        }

        if(recursive && fs.statSync(file).isDirectory()) {
            if(file != '.git' && file != 'node_modules') {
                fileNames = fileNames.concat(exports.getFilesInDir(recursive, file));
            }
        }
    }

    return fileNames;
}

exports.isAudio = function(fileName) {
    return (/\.(3gp|aa|aac|aax|act|aiff|amr|ape|au|awb|azw3|dct|dss|dvg|flac|gsm|iklax|ivs|m4a|m4b|m4p|m4u|mmf|mp3|mpc|msv|ogg|oga|opus|ra|rm|raw|sln|tta|vox|wav|wma|vw|webm)$/i).test(fileName)
}

exports.removeExtension = function(fileName){
    var regex = /(.*?)\.[^.]*/,
        match = regex.exec(fileName);

    if(match) {
        return match[1];
    }

    return fileName;
}

exports.rename = function(origName, newName, handler) {
    fs.rename(origName, newName, function(err) {
        handler(err);
    });
}

exports.makeFilePathDirectories = function(file) {
    var filenameRegex = /[^\/]*$/;
    var dir = file.replace(filenameRegex, '');

    if (!fs.existsSync(dir)){
        fs.mkdirsSync(dir);
    }
}

exports.removeDirectory = function(dir) {
    fs.emptyDirSync(dir);
    fs.rmdirSync(dir);
}
