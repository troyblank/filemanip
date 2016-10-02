'use strict';

const exec = require('child_process').exec;
const fileUtil = require('../util/file');

var isRecursive;
var garbageBag = [];

exports.run = function(action, flag) {
    exports.convertFiles(fileUtil.getFilesInDir('-r' === flag));
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
            // inside joke with major client using tool :P
            fileUtil.deleteFiles(garbageBag, function() {
                garbageBag = [];
                console.log('Karate chop! .... thank you.');
            });
        }
    }

    convertAFile();
}

exports.convertFile = function(file, handler) {
    var toFile = fileUtil.removeExtension(file) + '.mp3',
        command = 'ffmpeg -i "' + file + '" -acodec libmp3lame -ab 320k -id3v2_version 3 "' + toFile + '" -n';

    if(fileUtil.exists(toFile)) {
        console.log(toFile + ' already exists; skipping.');
        handler();
    } else if(fileUtil.isAudio(file)) {
       exec(command, function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);

            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                garbageBag.push(file);
                console.log('Converted ' + file + ' to ' + toFile + '.');
            }

            handler();
        }); 
    } else {
        console.log(file + ' is not a known audio type; skipping.');
        handler();
    }
}