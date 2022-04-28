"use strict";
exports.__esModule = true;
var arrayMap = require("../dist/test-array-map");
var res = arrayMap([1, 2, 3, 4], function (item) {
    return item + '_';
});
console.log(res);
