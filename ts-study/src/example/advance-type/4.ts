export {}

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

interface Info {
  name: string,
  age: number,
  address: string,
}
const info: Info = {
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
const nameAddr = pickFunc(info, ['name', 'address'])
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


// ------------------增加(+) / 移除(-) 特定修饰符  ---------------------

type AddReadonlyType<T> = {
  +readonly [P in keyof T]?: T[P]
}
type RemoveReadonlyType<T> = {
  -readonly [P in keyof T]-?: T[P]
}

interface IInfo {
  age: number
}

type HasReadonlyInfo = AddReadonlyType<IInfo>
type WithoutReadonly = RemoveReadonlyType<IInfo>

const info1: HasReadonlyInfo = {
  age: 100                      // readonly && 可选
}
const info2: WithoutReadonly = {
  age: 100                      // 非 readonly && 必选
}
// info1.age = 0              // readonly
info2.age = 0                // ok


const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()

type Obj = {
  [stringIndex]: string;
  [numberIndex]: number;
  [symbolIndex]: symbol;
}

// type KeysType = keyof Obj
type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P]
}

let obj: ReadonlyTypes<Obj> = {
  a: 'aaa',
  1: 111,
  [symbolIndex]: Symbol()
}
// obj.a = ''    // readonly


// -------------- promise ------------------
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}
type Tuple = [number, string, boolean]
type promiseTuple = MapToPromise<Tuple>

let tuple1: promiseTuple = [
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve('string')),
  new Promise((resolve, reject) => resolve(false)),
]
