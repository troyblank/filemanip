'use strict';

const exec = require('child_process').exec;
const arrayUtil = require('../util/array');
const fileUtil = require('../util/file');

exports.run = function(action, otherParams) {
    const numberToCopy = otherParams[0];
    const dirToCopyFrom = otherParams[1];
    const isMusicOnly = otherParams.includes('-music')

    exports.copyFiles(numberToCopy, dirToCopyFrom, isMusicOnly)
}

exports.copyFiles = (numberToCopy, dirToCopyFrom, isMusicOnly) => {
    const { copyFiles } = fileUtil;
    const filesToCopy = exports.getRandomFiles(numberToCopy, dirToCopyFrom, isMusicOnly)

    console.log('....')
    copyFiles(filesToCopy)
    console.log('done!')
}

exports.getRandomFiles = (numberToCopy, dirToCopyFrom, isMusicOnly) => {
    const { getFilesInRemoteDir, isAudio } = fileUtil;
    let randomListOfFiles = arrayUtil.shuffle(getFilesInRemoteDir(true, dirToCopyFrom))

    console.log(randomListOfFiles)

    if ( isMusicOnly ) {
        randomListOfFiles = randomListOfFiles.filter((file) => isAudio(file))
    }

    return randomListOfFiles.slice(0, numberToCopy)
}
