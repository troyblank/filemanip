// 'use strict';
const exec = require('child_process').exec;
const fileUtil = require('../util/file');

const convertDir = './filemanip-converted/';
let garbageBag = [];
let convertedBag = [];

exports.cleanHouse = function() {
    fileUtil.deleteFiles(garbageBag, function() {
        fileUtil.takeFilesOutOfDir(convertedBag, convertDir, function() {
            fileUtil.removeDirectory(convertDir);
            garbageBag = [];
            convertedBag = [];
        });
    });
}

exports.run = function(speed = 1.3) {
    const files = fileUtil.getFilesInDir()
    let counter = 0

    function next() {
        if(counter < files.length) {
            const targetFile = files[counter];
            const toFile = fileUtil.removeExtension(targetFile) + '.mp3';
            const command = `ffmpeg -i "${targetFile}" -filter:a "atempo=${speed}" -vn "${convertDir}${toFile}"`;
            counter++;

            if(fileUtil.isAudio(targetFile)) {
                fileUtil.makeFilePathDirectories(`${convertDir}${toFile}`);

                exec(command, function (error, stdout, stderr) {
                    //console.log('stdout: ' + stdout);

                    if (error !== null) {
                        console.log('exec error: ' + error);
                    } else {
                        garbageBag.push(targetFile);
                        convertedBag.push(toFile);

                        process.stdout.write('.');
                        next();
                    }
                });
            }
        } else {
            exports.cleanHouse()
        }
    }

    next();
}
