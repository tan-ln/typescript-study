import arrayMap = require("../dist/test-array-map");
arrayMap([1, 2, 3, 4], (item) => {
  return item + '_'
})
