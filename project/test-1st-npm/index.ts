import arrayMap = require('1st-npm-arrymap')
const res = arrayMap([1, 2, 3, 4], (item) => `_${item}_`)
console.log(res);
