'use strict';

exports.addLeadingZeros = function(string, spots) {
    if (string.length < spots) {
        var zeros = "";
        var amountToFill = spots - string.length;
        for (var i = 0; i < amountToFill; i++) {
            zeros += "0";
        }
        string = zeros + string
    }
    return string;
}