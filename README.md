# filemanip
An NPM CLI that allows file manipulation. A lot of commands require ffmpeg to be pre-installed.

This is a very random, quick n' dirty (no unit tests) list of commands that I use to help friends and family organize media files. Any other use would be plesant but not anticipated.

## Requirements
* Node
* ffmpeg

## Installation
To install simply run

    npm install -g filemanip

## Usage
To use filmanip cd into a directory of files you want manipulated and run ```filemanip command``` where 'command' is one of the commands below.

## Commands
* convert mp3          -- converts files into mp3 files
  * convert mp3 -r     -- converts files into mp3 files recursively using subfolders
* split mp3            -- splits files into mp3 files into 30 min chunks
* meta randomplay      -- prepends `x_` in random order to filename and title, where 'x' is descending numbers
* meta addtracknumbers -- adds track numbers to files

## Help
To get help in the CLI run
    
    filemanip -h
