// const add = (arg1: number, arg2: number) => arg1 + arg2

// 函数类型定义
let add: (x: number, y: number) => number
add = (arg1: number, arg2: number) => arg1 + arg2

// 类型别名
type Add = (x: number, y: number) => number
let addFun: Add = (x: number, y: number) => x + y

// 可选参数
// 必须在比选参数后
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction = (x: number, y: number) => x + y
let addFunction2: AddFunction = (x: number, y: number, z?: number) => x + y + (z || 0)
// console.log(addFunction(1, 2))          // 3
// console.log(addFunction2(1, 2, 3))      // 6

// 扩展运算符
const handleData = (a: number, ...args: number[]) => {}

// 函数重载
// 只能使用 function 定义，不能使用 接口或别名
// 编译器能根据不同的参数类型判断返回值的类型
function reLoadFun (x: string): string[]
function reLoadFun (x: number): number[]
function reLoadFun (x: any): any {
  if (typeof x === 'string') {
    return x.split('')
  } else {
    return x.toString().split('').map((item: any) => Number(item))
  }
}
// console.log(reLoadFun('abc'));          // ['a', 'b', 'c']
// console.log(reLoadFun(123));            //  [1, 2, 3]

// reLoadFun('abc').map((item) => {
//   return item.toFixed()               // error Property 'toFixed' does not exist on type 'string'
// })

// reLoadFun(123).map((item) => {
//   return item.length                // error 类型“number”上不存在属性“length”
// })
