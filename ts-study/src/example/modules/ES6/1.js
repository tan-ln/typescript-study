// ES6 模块化 export

export const name = 'tang'
const age = 18
const foo = function () {
  console.log('function foo');
}
class A {}

const obj = {
  type: 'array',
  data: []
}

export {
  age,
  foo as Foo1 ,
  A as ClassA,
  obj
}

// 1. export 导出的是一个“接口”而非一个具体的值
// export 'sth'               // error
const a = 'a'
// export a                   // error

// 2. export 导出的内容与其对应的值是 动态绑定的
// 导出的内容发生变化，引入内容值同时变化

// 3. export 命令可以出现在模块中的顶层的任何位置 
// 不是文件顶部，而是不能出现在块级作用域内
if (true) {
  // export const b = 'b'            // error
}


// ES6 模块化 是 静态编译
// 在编译阶段就已经引入，而非执行阶段引入


// 4. export default 只能导出一次
// 导出的是一个 名为 default 的内容
//  export default {}
//  export default 'string'
//  export { foo as default }

// 5. 导入再导出
// import { age, name } from './a'
// export { age, name }
// 相当于
// export { age, name } from './a'
// 直接导出，在本文件中则不能使用  age, name

// 6. 
// export { name as nameProps } from './a'
// export * from './a'

// 7.
// export { name as default } from './a
// 相当于
// import { name } from './a'
// export default name
