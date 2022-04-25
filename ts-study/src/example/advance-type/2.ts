export {}

// ----------------- 类型别名 ---------------------
// 给原始类型指定类型别名没有什么意义
type TypeString = string
let str: TypeString

// 使用泛型
type PositionType<T> = { x: T, y: T }
const p1: PositionType<number> = { x: 1, y: -1 }
const p2: PositionType<string> = { x: '1', y: '-1' }

// 使用类型别名在属性中引用自己
type Tree<T> = {
  value: T,
  left?: Tree<T>,
  right?: Tree<T>,
}
// 类似树状结构 嵌套
type Childs<T> = {
  current: T,
  child?: Childs<T>,
}
const c: Childs<string> = {
  current: '1st',
  child: {
    current: '2nd',
    child: {
      current: '3rd'
    }
  }
}

// 不能直接使用
// type Test = Test  // error 类型别名“Test”循环引用自身

// type vs interface
type Alias = {
  num: number
}
interface Interface {
  num: number
}
let _alias: Alias = {
  num: 123
}
let _Interface: Interface = {
  num: 321
}
_alias = _Interface         // 兼容



// ----------------- 字面量类型 ---------------------
// 字符串字面量类型 + 数字字面量类型

// 字符串字面量类型
type Name = 'Tan'             // 此处的 'Tan' 作为一个 字符串字面量使用
// const name: Name = '00'       // error 不能将类型“"00"”分配给类型“"Tan"”

type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionInitials (direction: Direction) {
  return direction.slice(0, 1).toUpperCase()
}

console.log(getDirectionInitials('north'));       // N

// 数字字面量类型
type Age = 18
interface InfoInterface {
  name: string,
  age: Age
}

const _info: InfoInterface = {
  name: 'tan',
  age: 18,
  // age: 100,               // error 不能将类型“100”分配给类型“18”
}


// ----------------- 枚举成员类型 (../enum.ts) ---------------------
// 条件
// 1. enum E { A } 没有初始值
// 2. enum E { a = 'a' } 全部为 字符串
// 3. enum E { a = -1 } 全部为 数值


/**
 *  ----------------- 可辨识联合类型 ---------------------
 *  可辨识联合两要素
 *  1. 具有普通的单例类型属性
 *  2. 一个类型别名包含哪些类型的联合
 */ 

interface Square {
  kind: 'square',
  size: number
}
interface Rectangle {
  kind: 'rectangle',
  height: number,
  width: number
}
interface Circle {
  kind: 'circle',
  radius: number
}
type Shape = Square | Rectangle | Circle
function getArea (s: Shape): number {
  switch (s.kind) {
    case 'square': return s.size * s.size;
    case 'rectangle': return s.height * s.width;
    case 'circle': return Math.PI * s.radius ** 2;  // ** ES7 表示 幂运算 **2 平方 **3 立方 
  }
}

// ----------------- 完整性检查 ---------------------
// 1. strictNullChecks
// 2. never

function assertNever (value: never): never {
  throw new Error('Unexpected object' + value)
}
function getArea2 (s: Shape): number {
  switch (s.kind) {
    case 'square': return s.size * s.size;
    case 'rectangle': return s.height * s.width;
    // 当少了 circle 时，提示
    case 'circle': return Math.PI * s.radius ** 2;  // ** ES7 表示 幂运算 **2 平方 **3 立方 
    // default:
      // return assertNever(s)   // 类型“Circle”的参数不能赋给类型“never”的参数
  }
}
