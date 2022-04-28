"use strict";
var arrayMap = function (arr, callback) {
    var i = -1;
    var len = arr.length;
    var res = [];
    while (++i < len) {
        res.push(callback(arr[i], i, arr));
    }
    return res;
};
module.exports = arrayMap;
