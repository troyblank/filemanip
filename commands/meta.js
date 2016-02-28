'use strict';

const exec = require('child_process').exec;
const arrayUtil = require('../util/array');
const fileUtil = require('../util/file');
const ffmetadata = require('ffmetadata');

var dir = process.cwd();

exports.run = function(action) {
    switch(action) {
        case 'randomplay':
            exports.randomPlayOrder();
    }
}

exports.randomPlayOrder = function() {
    exports.getRandomFiles(exports.addOrderToMetaAndName);
}

exports.getRandomFiles =  function(handler) {
    fileUtil.getFilesInDir(function(files){
        handler(arrayUtil.shuffle(files));
    });
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
            newData.title = String(count) + '_' + data.title;
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
    fileUtil.rename(file, String(count) + '_' + file, function(err) {
        if (err) {
            console.log('ERROR: renaming file ' + err);
        } else {
            handler();
        }
    });
}