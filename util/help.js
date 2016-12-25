exports.showHelpText = function() {
    console.log(
`
Usage: filemanip [command] [action] [optional-flag]

Commands:
---------------------------------------------------------------------
convert
    mp3 (converts files into mp3 files)
        -r ( includes subfolders)
meta
    addtracknumbers (adds track numbers to files)
    randomplay (prepends 'x-' in random order to the filename and
        title; where 'x' is descending numbers)
`
    );
}
