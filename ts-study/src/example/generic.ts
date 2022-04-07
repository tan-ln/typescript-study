// const getArray = (value: any, times: number = 5): any[] => {
//   return new Array(times).fill(value)
// }
// console.log(getArray('a', 8));   // ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']

// 使用 泛型
const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value)
}

// 指定泛型变量的类型
console.log(getArray<string>('0000', 2).map(item => item.length))   // [4, 4]
console.log(getArray<number>(0, 4).map(item => item.toFixed(2)))    // ['0.00', '0.00', '0.00', '0.00']

                                                          // 元组 [T, U][]
const getArray2 = <T, U>(arg1: T, arg2: U, times: number = 5): [T, U][] => {
  return new Array(times).fill([arg1, arg2])
}
// console.log(getArray2<string, number>('a', 10, 2))   // [['a', 10], ['a', 10]]
// 不写则 自动推断类型
console.log(getArray2('a', 10, 2))   // [['a', 10], ['a', 10]]

// -----------------------------------------------------
// 使用 泛型定义函数类型
let getArray3: <T>(a: T, b: number) => T[]
getArray3 = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}
console.log(getArray3(123, 4))

// -----------------------------------------------------
// 使用 类型别名
type GetArray4 = <T>(a: T, b: number) => T[]
let foo: GetArray4 = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}

// -----------------------------------------------------
// 使用 接口
interface GetArray5 {
  (arg: any, times: number): any[],
  <T>(arg: T, times: number): T[]
}
// 写在最外层，则内部所有属性都可使用 泛型 T
interface GetArray6<T> {
  (arg: T, times: number): T[],
  array: T[]
}


// 泛型约束

// 有 length 属性的值
interface ValueWithLength {
  length: number
}
let getArray7 = <T extends ValueWithLength>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg)
}
console.log(getArray7([1, 2], 2))
// console.log(getArray7(100, 2))          // Argument of type 'number' is not assignable to parameter of type 'ValueWithLength'
console.log(getArray7({
  length: 1    // 在对象内部自己创建 length
}, 2))                                    // [{length: 1}, {length: 1}]


// 索引
                     // L 是 T 类型的属性的数组
const getProps = <T, L extends keyof T>(obj: T, propName: L) => {
  return obj[propName]
}
const obj = { a: 'a', b: 'b'}
getProps(obj, 'a')
// getProps(obj, 'c')        // Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'
