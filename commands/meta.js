'use strict';

const arrayUtil = require('../util/array');
const fileUtil = require('../util/file');
const stringUtil = require('../util/string');
const ffmetadata = require('ffmetadata');

 // FFMPEG has errors if it has to write to a file twice in quick succession, delay smooths this out.
const WRITE_DELAY = 5000;
var isRecursive;

exports.run = function(action, otherParams) {
    const multiplier = Number(otherParams[0]) || 1

    switch(action) {
        case 'randomplay':
            exports.randomPlayOrder(multiplier);
        case 'addtracknumbers':
            exports.addTracknumbers();
    }
}

exports.randomPlayOrder = function(multiplier) {
    exports.addOrderToMetaAndName(exports.getRandomFiles(), multiplier);
}

exports.addTracknumbers = function() {
    exports.addTrackNumberMetadata(fileUtil.getFilesInDir());
}

exports.getRandomFiles =  function() {
    var files = fileUtil.getFilesInDir();
    return arrayUtil.shuffle(files);
}

exports.addOrderToMetaAndName = function(files, multiplier){
    var counter = 0,
        audioCounter = 0;

    function next() {
        if(counter < files.length) {
            var targetFile = files[counter];
            counter++;

            if(fileUtil.isAudio(targetFile)) {
                //appends 1_, 2_, 3_ .... to file title and file name
                audioCounter += multiplier;
                exports.addOrderToMetaTitle(targetFile, audioCounter, function(){
                    setTimeout(() => {
                        exports.addOrderToFileName(targetFile, audioCounter, next);
                    }, WRITE_DELAY)
                    process.stdout.write('.');
                });
            } else {
                next();
            }
        }
    }

    next();
}

exports.addOrderToMetaTitle = function(file, count, handler) {
    var newData = {};
    ffmetadata.read(file, function(err, data) {
        if (err) {
            console.error('ERROR: reading metadata ', err);
        } else if(data.title) {
            newData.title = stringUtil.addLeadingZeros(String(count), 3) + '_' + data.title;
        }

        ffmetadata.write(file, newData, {'id3v2.3':true}, function(err) {
            if (err) {
                console.error('ERROR: writing metadata ', err);
            } else {
                handler();
            }
        });
    });
}

exports.addOrderToFileName = function(file, count, handler) {
    fileUtil.rename(file, stringUtil.addLeadingZeros(String(count), 3) + '_' + file, function(err) {
        if (err) {
            console.log('ERROR: renaming file ' + err);
        } else {
            handler();
        }
    });
}

exports.addTrackNumberMetadata = function(files) {
    var counter = 0,
        audioCounter = 0,
        data = {};


    function next() {
        if(counter < files.length) {
            var targetFile = files[counter];
            counter++;

            if(fileUtil.isAudio(targetFile)) {
                audioCounter++;
                data.track = audioCounter;
                ffmetadata.write(targetFile, data, {'id3v2.3':true}, function(err) {
                    if (err) {
                        console.error('ERROR: writing metadata ', err);
                    } else {
                        next();
                    }
                });
            } else {
                next();
            }
        }
    }

    next();
}
