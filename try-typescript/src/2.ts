/**
 * 原始数据类型
 */

export {}

const a: string = 'string'
const b: number = 100       // NaN || Infinity
const c: boolean = true || false

// 上面三种可以为空 (null || undefined) 非严格模式下

const d: void = undefined      // undefined 严格模式下只能 undefined
const e: null = null
const f: undefined = undefined

const g: symbol = Symbol()

// --------------------------------
// Object 类型
// 通常使用接口

const foo: object = {}          // [] 、 function () {}

const obj: { foo: number, bar: string } = { foo: 100, bar: 'string' }


// Array 类型
const arr: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]


function sum (...args: number[]) {
  return args.reduce((a, b) => a + b)
}

// sum(1, 2, 3, '4')
sum(1, 2, 3)
