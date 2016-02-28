'use strict';

const fs = require('fs');

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
}

exports.getFilesInDir =  function(handler) {
    var dir = process.cwd(),
        fileNames = [];

    fs.readdir(dir, function(err, files){
        for (var i=0; i<files.length; i++) {
            var file = files[i];

            if (fs.statSync(file).isFile()) {
                fileNames.push(file);
            }
        }
        handler(fileNames);
    });
}

exports.isAudio = function(fileName) {
    return (/\.(3gp|aa|aac|aax|act|aiff|amr|ape|au|awb|azw3|dct|dss|dvg|flac|gsm|iklax|ivs|m4a|m4b|m4p|m4u|mmf|mp3|mpc|msv|ogg|oga|opus|ra|rm|raw|sln|tta|vox|wav|wma|vw|webm)$/i).test(fileName)
}

exports.removeExtension = function(fileName){
    var regex = /(.*?)\.[^.]*/,
        match = regex.exec(fileName);

    return match[1];
}

exports.rename = function(origName, newName, handler) {
    fs.rename(origName, newName, function(err) {
        handler(err);
    });
}