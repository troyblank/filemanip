'use strict';

const exec = require('child_process').exec;
const fileUtil = require('../util/file');

exports.run = function(action, flag) {
    exports.combineFiles(fileUtil.getFilesInDir('-r' === flag));
}

exports.cleanHouse = function(files) {
    fileUtil.deleteFiles(files, function() {
        console.log('Karate chop! .... thank you.');
    });
}

exports.combineFiles = function(files) {
    console.log('\n---------- Please wait while we combine dem files ----------\n');
    console.log(' (\\_(\\');
    console.log(' ( -.-)');
    console.log('0((“)(“)\n');

    var audioFiles = exports.getAudioFiles(files);
    var commandFormatedFiles = `concat:${audioFiles.join('|')}`;
    var outputName = 'output.mp3';
    var command = 'ffmpeg -i "' + commandFormatedFiles + '" -c copy "' + outputName + '"';

    console.log(command)

    exec(command, function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);

        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            console.log(`Combined the files ${audioFiles} to ' ${outputName}.`);
            exports.cleanHouse(audioFiles);
        }
    });
}

exports.getAudioFiles = function(files) {
    const audioFiles = [];

    files.forEach((file) => {
        if(fileUtil.isAudio(file)) {
            audioFiles.push(file);
        }
    });

    return audioFiles;
}
