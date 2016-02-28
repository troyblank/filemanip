'use strict';

exports.shuffle = function(array) {
    var i = array.length,
    tempVal,
    randomIndex;

    while (0 !== i) {
      randomIndex = Math.floor(Math.random() * i);
      i -= 1;

      tempVal = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = tempVal;
    }

    return array;
}