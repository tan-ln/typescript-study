"use strict";
exports.__esModule = true;
var arrayMap = require("1st-npm-arrymap");
var res = arrayMap([1, 2, 3, 4], function (item) { return "_".concat(item, "_"); });
console.log(res);
