'use strict';

const exec = require('child_process').exec;
const fileUtil = require('../util/file');

var isRecursive;
var garbageBag = [];

exports.run = function(action, flag) {
    exports.splitFiles(fileUtil.getFilesInDir('-r' === flag));
}

exports.cleanHouse = function() {
    fileUtil.deleteFiles(garbageBag, function() {
            garbageBag = [];
            // inside joke with major client using tool :P
            console.log('Karate chop! .... thank you.');
        //});
    });
}

exports.splitFiles = function(files) {
    var counter = 0;

    console.log('\n---------- Please wait while we split dem files ----------\n');
    console.log(' (\\_(\\');
    console.log(' ( -.-)');
    console.log('0((“)(“)\n');

    function splitAFile() {
        if(counter < files.length) {
            var targFile = files[counter];
            counter++;
            exports.splitFile(targFile, splitAFile);
        } else {
            exports.cleanHouse();
        }
    }

    splitAFile();
}

exports.splitFile = function(file, handler) {
    var toFile = fileUtil.removeExtension(file) + '%03d.mp3',
        command = 'ffmpeg -i "' + file + '" -f segment -segment_time 1800 -c copy "' + toFile+'"';

    console.log(command)

    if(fileUtil.isAudio(file)) {
        fileUtil.makeFilePathDirectories(toFile);

        exec(command, function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);

            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                garbageBag.push(file);
                console.log('Split ' + file + ' to ' + toFile + '.');
            }

            handler();
        });
    } else {
        console.log(file + ' is not a known audio type; skipping.');
        handler();
    }
}
