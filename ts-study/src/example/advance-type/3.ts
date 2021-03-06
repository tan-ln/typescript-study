export {}

// ----------------- this 类型 -----------------
class Counter {
  constructor (public count: number = 0) {}
  public add (value: number) {
    this.count += value
    return this
  }
  public substract (value: number) {
    this.count -= value
    return this
  }
}

let c = new Counter(10)
console.log(c.add(10).substract(2));    // Counter {count: 18}
// return this 链式调用

class PowCounter extends Counter {
  constructor (public count: number = 0) {
    super(count)
  }
  public pow(value: number) {
    this.count = this.count ** value
    return this
  }
}
let pc = new PowCounter(5)
console.log(pc.add(1).substract(2).pow(3));    // PowCounter {count: 64}

// ----------------- 索引 类型 -----------------
interface IInfo {
  name: string,
  age: number,
}

let info: keyof IInfo     // 相当于 字符串字面量类型 'name' | 'age' 的联合类型
info = 'name'
info = 'age'
// info = 'n'    // error

//                                  K 是由 T类型的值的 key 组成的数组
function getValue <T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(item => obj[item])
}
const infoObj = {
  name: 'tan',
  age: 18
}
let values: (string | number)[] = getValue(infoObj, ['name', 'age'])
console.log(values);    // ["tan", 18]


// ----------------- 索引访问操作符 [] -----------------
type NameType = IInfo['name']

function getProperty <T, U extends keyof T>(o: T, name: U): T[U] {
  return o[name]
}


// ----------------- 索引签名 T[string] -----------------

interface Obj<T> {
  [key: string]: T
}
const obj: Obj<number> = {
  age: 100
}
let key: keyof Obj<number>        //  string | number
let value: Obj<number>['name']    // number


interface Type {
  a: never,
  b: never,
  c: string,
  d: number,
  e: undefined,
  f: null,
  g: object
}

type Test = Type[keyof Type]
