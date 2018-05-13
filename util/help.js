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
combine
    mp3 (combines multipe mp3 files into one mp3 file)
meta
    addtracknumbers (adds track numbers to files)
    randomplay (prepends 'x-' in random order to the filename and
        title; where 'x' is descending numbers)
`
    );
}
