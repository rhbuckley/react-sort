"use strict";
exports.__esModule = true;
exports.shuffleArray = void 0;
exports.shuffleArray = function (array) {
    var _a;
    // Fisher-Yates shuffle
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
