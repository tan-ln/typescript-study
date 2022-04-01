/**
 * @flow
 */

// 1. 原始类型
const a: string = 'string'
const b: number = 100 || NaN || Infinity
const c: boolean = false || true
const d: null = null
const e: void = undefined
const f: symbol = Symbol()

// ----------------------------------
// 2. 数组
// 泛型
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 固定长度的数组 === 元组
const foo: [string, number] = ['foo', 100]

// ----------------------------------
// 3. 对象
const obj1: { str: string, num: number} = { str: 'string', num: 100 }

// 表示可选 ?
const obj2: { str?: string, num: number} = { num: 100 }

// 动态设置属性
// 可使用 索引
// 表示可以添加任意属性，但类型为 string
const obj3: { [string]: string } = {}
obj3.key1 = 'string'
// obj3.key2 = 100             // error

// ----------------------------------
// 4. 函数
// 返回值类型 void
function fn (callback: (string, number) => void) {
  callback('string', 100)
}
fn(function (str, num) {
  // 无返回值或 undefined
  return undefined
})

// ----------------------------------
// 5. 特殊类型
// 字面量
const aaa: 'aaa' = 'aaa'

const type: 'success' | 'warning' | 'danger' = 'success'      // 三选一，其他则报错

type StringOrString = string | number
const bbb: StringOrString = 'string'


// ?number 表示还可以支持 null | undefined 类型
const gender: ?number = null

// ----------------------------------
// mixed 接受任意类型的值
function passMixed (value: mixed) {
  // mixed 强类型
  // 直接使用会报错
  // value.substr(1)
  // value * 10
  if (typeof value === 'string') {
    value.substr(1)
  }
}
passMixed('string')
passMixed(100)

// ----------------------------------
// any 接受任意类型的变量
function passAny (value: any) {
  // any 弱类型
  // 都不会报错
  value.substr(1)
  value * 10
}
passAny('string')
passAny(100)

