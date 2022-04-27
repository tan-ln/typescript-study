// ES6 模块化 import

import { name as myName, age, Foo1, obj } from './1'
console.log(name);      // 无法访问
console.log(myName);    // tang
console.log(age);       // 18
Foo1()                  // function foo
console.log(obj);       // {type: "array", data: Array(0)}


// 1. 对于全局操作，引入则生效
import './2'

// 2. import 命令将提升到模块头部，首先执行
// 静态编译，在编译阶段自动提升

// 3. 多个重复导入，最终会合并为一个
// import { age } from './1'
// import { name } from './1'
// 相当于
// import { age, name } from './1'

// 4. 
import * as temp from './1'
console.log(temp.ClassA);

// 5. 导入 default 
// import foo from './1
// import { default as foo } from './1

// 6.import() 方法
// 程序执行阶段动态引入，按需加载
// 没有正式加入标准
// webpack 可以实现

// 返回一个 promise
const status = 1
if (status) {
  import('./3')
}