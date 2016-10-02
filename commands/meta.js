'use strict';

const exec = require('child_process').exec;
const arrayUtil = require('../util/array');
const fileUtil = require('../util/file');
const stringUtil = require('../util/string');
const ffmetadata = require('ffmetadata');

var isRecursive;

exports.run = function(action) {
    switch(action) {
        case 'randomplay':
            exports.randomPlayOrder();
        case 'addtracknumbers':
            exports.addTracknumbers();
    }
}

exports.randomPlayOrder = function() {
    exports.addOrderToMetaAndName(exports.getRandomFiles());
}

exports.addTracknumbers = function() {
    exports.addTrackNumberMetadata(fileUtil.getFilesInDir());
}

exports.getRandomFiles =  function() {
    var files = fileUtil.getFilesInDir();
    return arrayUtil.shuffle(files);
}

exports.addOrderToMetaAndName = function(files){
    var counter = 0,
        audioCounter = 0;

    function next() {
        if(counter < files.length) {
            var targFile = files[counter];
            counter++;

            if(fileUtil.isAudio(targFile)) {
                //appends 1_, 2_, 3_ .... to file title and file name
                audioCounter++;
                exports.addOrderToMetaTitle(targFile, audioCounter, function(){
                    exports.addOrderToFileName(targFile, audioCounter, next);
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
            newData.title = stringUtil.addLeadingZeros(String(count), 2) + '_' + data.title;
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
    fileUtil.rename(file, stringUtil.addLeadingZeros(String(count), 2) + '_' + file, function(err) {
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
            var targFile = files[counter];
            counter++;

            if(fileUtil.isAudio(targFile)) {
                audioCounter++;
                data.track = audioCounter;
                ffmetadata.write(targFile, data, {'id3v2.3':true}, function(err) { 
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