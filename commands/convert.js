'use strict';

const exec = require('child_process').exec;
const fileUtil = require('../util/file');

var isRecursive;
var garbageBag = [];
var convertedBag = [];
var convertDir = './filemanip-converted/';

exports.run = function(action, flag) {
    exports.convertFiles(fileUtil.getFilesInDir('-r' === flag));
}

exports.cleanHouse = function() {
    fileUtil.deleteFiles(garbageBag, function() {
        fileUtil.takeFilesOutOfDir(convertedBag, convertDir, function() {
            fileUtil.removeDirectory(convertDir);
            garbageBag = [];
            convertedBag = [];
            // inside joke with major client using tool :P
            console.log('Karate chop! .... thank you.');
        });
    });
}

exports.convertFiles = function(files) {
    var counter = 0;

    console.log('\n---------- Please wait while we convert dem files ----------\n');
    console.log(' (\\_(\\');
    console.log(' ( -.-)');
    console.log('0((“)(“)\n');

    function convertAFile() {
        if(counter < files.length) {
            var targFile = files[counter];
            counter++;
            exports.convertFile(targFile, convertAFile);
        } else {
            exports.cleanHouse();
        }
    }

    convertAFile();
}

exports.convertFile = function(file, handler) {
    var toFile = fileUtil.removeExtension(file) + '.mp3',
        command = 'ffmpeg -i "' + file + '" -acodec libmp3lame -ab 320k -id3v2_version 3 "' + convertDir + toFile + '" -n';

    if(fileUtil.isAudio(file)) {
        fileUtil.makeFilePathDirectories(convertDir + toFile);

        exec(command, function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);

            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                garbageBag.push(file);
                convertedBag.push(toFile);
                console.log('Converted ' + file + ' to ' + toFile + '.');
            }

            handler();
        }); 
    } else {
        console.log(file + ' is not a known audio type; skipping.');
        handler();
    }
}