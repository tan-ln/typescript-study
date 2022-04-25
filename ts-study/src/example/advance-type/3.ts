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
info = 'name'
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


// ----------------- 映射类型 -----------------
// 从旧类型中创建新类型
interface InfoType {
  age: number,
  name: string,
  sex: string
}
interface ReadonlyType {
  readonly age: number
}
// 类型字段多，重定义不方便
// 映射类型
type ReadonlyMapType<T> = {
  // in ==> for .. in
  readonly [P in keyof T]: T[P]
}
type ReadOnlyInfo = ReadonlyMapType<InfoType>
let _info: ReadOnlyInfo = {
  age: 18,
  name: 'tan',
  sex: 'man'
}
// _info.age = 100       // error: readonly

// ts 内置了 常用的两种
// 把类型转换为每一个都是只读的 和 每一个都是可选的

// ----------- Readonly && Partical-------------
type ReadOnlyInfo2 = Readonly<InfoType>
type ReadOnlyInfo3 = Partial<InfoType>


// --------------- Pick && Record -----------------
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Info2 {
  name: string,
  age: number,
  address: string,
}
const info2: Info2 = {
  name: 'tan',
  age: 100,
  address: ''
}
//                                                  T 类型对象上的部分属性组成的类型
function pickFunc <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: any = {}
  keys.map(key => {
    res[key] = obj[key]
  })
  return res
}
const nameAddr = pickFunc(info2, ['name', 'address'])
console.log(nameAddr);      // {name: 'tan', address: ''}

// Record 将一个对象中的每一个属性，转换为其他值
function mapObject <K extends string | number, T, U>(
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  let res: any = {}
  for (const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}
const name_obj = {
  0: 'hello',
  1: 'world',
  2: 'typescript'
}
let length = mapObject(name_obj, (s) => s.length)
console.log(length);          // {0: 5, 1: 5, 2: 10}


// -------------------由映射类型进行推断---------------------
type Proxy<T> = {
  get(): T,
  set(value: T): void
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}
function proxify <T>(obj: T): Proxify<T> {
  let res = {} as Proxify<T>
  for (const key in obj) {
    res[key] = {
      get: () => obj[key],
      set: (value) => obj[key] = value
    }
  }
  return res
}
let props = {
  name: 'tan',
  age: 18
}
let proxyProps = proxify(props)
console.log(proxyProps.name.get());         // tan
console.log(proxyProps.age.set(100));       // 100


// 拆包
function unProxify <T>(t: Proxify<T>): T {
  let res = {} as T
  for (const key in t) {
    res[key] = t[key].get()
  }
  return res
}
let originlProps = unProxify(proxyProps)
// 从映射类型推断出原对象
console.log(originlProps);      // {name: 'tan', age: 100}
