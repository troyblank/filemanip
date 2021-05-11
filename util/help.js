exports.showHelpText = function() {
    console.log(
`
Usage: filemanip [command] [action] [optional-flag]

Commands:
---------------------------------------------------------------------
convert
    mp3 (converts files into mp3 files)
        -r ( includes subfolders)
split
    mp3 (splits files into mp3 files into 30 min chunks)
copy
    random (copies a number of files randomly with no repeating from a directory of your choice)
        \${number} how many files to copy
        \${directory} the location of the files to copy from
        -music only copies music
combine
    mp3 (combines multipe mp3 files into one mp3 file)
meta
    addtracknumbers (adds track numbers to files)
    randomplay (prepends 'x-' in random order to the filename and title; where 'x' is descending numbers)
        \${number}  how much the numbers increments by
speed (speeds up audio of a directory by 1.3)
    \${speed} override 1.3 and set custom speed
`
    );
}
