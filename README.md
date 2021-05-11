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
* convert mp3                       -- converts files into mp3 files
  * convert mp3 -r                  -- converts files into mp3 files recursively using subfolders
* copy random /x/ /dir/             -- copies `x` number of files randomly with no repeating from a `dir` of your choice
  * copy random /x/ /dir/ -music    -- copies `x` number of music files randomly with no repeating from a `dir` of your choice
* split mp3                         -- splits files into mp3 files into 30 min chunks
* combine mp3                       -- combines multipe mp3 files into one mp3 file
* meta randomplay                   -- prepends `x_` in random order to filename and title, where 'x' is descending numbers
  * meta randomplay /x/             -- prepends `x_` in random order to filename and title, where 'x' is descending numbers and a passed `x` is how much the numbers increment by
* meta addtracknumbers              -- adds track numbers to files
* speed /speed/                     -- speeds up the files by the optional amount of `speed` (defaults is 1.3)

## Help
To get help in the CLI run
    
    filemanip -h
