// Nodejs 模块 遵循 commonjs 模块方案
// 1. 内置模块：fs 文件系统模块、net 网络系统模块 。。。
// 2. 用户自定义模块

// nodemon 执行

// 引入的是一个对象，导出的接口作为对象的属性
const info = require('./1')
console.log(info);            // { name: 'tang', age: 100 }
console.log(info.age);        // 100

const foo = require('./2')
foo()                         // module.exports
