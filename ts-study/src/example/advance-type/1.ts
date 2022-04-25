export {}
// ---------------- 交叉类型 & -----------------------
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
  // 使用类型断言
  // let obj = <T & U>{}
  // as 写法
  let res = {} as T & U
  res = Object.assign(arg1, arg2)
  return res
}

let a = { a: 'a' }
let b = { b: 'b' }
console.log(mergeFunc(a, b));   // {a: "a", b: "b"}


// ----------- 联合类型 type1 | type2 | type3 ------------
const getLength = (content: string | number): number => {
  if (typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}
console.log(getLength('123'));    // 3
console.log(getLength(123));      // 3
// console.log(getLength(true));     // error


// ------------------- 类型保护 ---------------------
const valueList = ['123', 100]
const getRandomValue = () => {
  const num = Math.random() * 10
  if (num < 5) { return valueList[0] }
  else { return valueList[1] }
}
const item = getRandomValue()

console.log(item);                                  // 无法确切知道 item 的类型
// console.log(item.length || item.tofixed() );     // 将会报错
// 1. 类型断言解决
console.log((item as string).length || (item as number).toFixed() );

// 2. 类型保护
function isString (value: string | number): value is string {
  return typeof value === 'string'
}
if (isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// ----------------- typeof 类型保护 ---------------------
// 函数 的方式适用于 复杂的情况
// 简单类型保护可以直接使用 typeof 类型保护
// 但是 typeof 必须确保 === 或是 !=== ((typeof item).includes('string') 则不行)
// 并且类型只能为 基本类型中的 string | number | boolean | symbol
if (typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// ----------------- instanceof 类型保护 ---------------------
class A {
  public type = 'type a'
}
class B {
  public name = 'named b'
}
function getRandomInstance () {
  return Math.random() < .5
    ? new A()
    : new B()
}

const ins_obj = getRandomInstance()
if (ins_obj instanceof A) {
  console.log(ins_obj.type);
} else {
  console.log(ins_obj.name);
}

// ----------------- null && undefined ---------------------
/**
 *  null && undefined 是特殊的两种类型
 *      类型检查器认为 null && undefined  可以赋值为任何类型
 *  tsconfig / strictNullChecks 标记可以解决这个问题
 *      之后声明一个变量时不会自动包含 null | undefined
 */

let s = 'foo'
// s = null        // error
let sn: string | null
sn = null          // 有效
// sn = undefined     // error 'undefined'不能赋值给'string | null'
// string | undefined 或 string | null 或 string | undefined | null 或 undefined | null 是几个完全不同的类型


// ----------------- 去除 null ---------------------
function getSplicedStr (num: number | null): string {
  function getRes (prefix: string) {
    // error num 对象可能为 null
    // 对于嵌套函数，编译器无法自动去除 null
    // return prefix + num.toFixed().toString()

    // 1. 类型断言
    // num! 表示不为 null
    return prefix + num!.toFixed().toString()

    // 2. 可选参数
    // return prefix + num?.toFixed().toString()
  }
  // 若为 null，则默认值为 0.1 ，但编译器无法识别，需要主动 类型断言
  num = num || .1
  return getRes('-prefix-')
}

console.log(getSplicedStr(3.141592653));    // -prefix-3
console.log(getSplicedStr(1));              // -prefix-1
console.log(getSplicedStr(null));           // -prefix-0
