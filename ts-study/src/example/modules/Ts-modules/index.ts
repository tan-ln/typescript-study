// 和 ES6 一致 import export
// 还有一些特定的语法

import { a } from './1'
import * as info from './2'
import * as file1 from './1'
console.log(a);         // a
console.log(info);      // {a: "a", age: 100, __esModule: true}

// 可以看到 ClassA | ClassB | classNamedB | a | propAge | age
// 无法看到 接口
// 只能看到实际 js 用到的东西
console.log(file1)

/**
 *  对于 ES6 模块化 和 CommonJS 模块化 不兼容问题
 *    export =
 * 
 *  
 */

// 1. export = ... && import ... = ...
// 相当于 import name from 'name'
// 引入默认导出
import name = require('./3')
console.log(name);
