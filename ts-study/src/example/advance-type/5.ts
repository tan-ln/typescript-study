export {}

/**
 *  ------------------------ unknown 类型 ---------------------------
 * 
 *  ts 3.0 顶级类型
 *    1. 任何类型都可以赋值给 unknown
 *    2. 如果没有 类型断言 或 基于控制流的类型细化时，
 *        unknown 只能赋值给 unknown | any，不能赋值给其他类型
 *    3. 如果没有 类型断言 或 基于控制流的类型细化时，
 *        不能在它上面进行任何操作
 *    4. unknown 与其他类型组成的交叉类型，最后都等于其他类型
 *    5. unknown 与其他类型（除 any）组成的联合类型，都等于 unknown 类型
 *    6. never 类型是 unknown 的子类型
 *    7. keyof unknown 等于类型 never
 *    8. 只能对 unknown 进行 等或不等操作，不能进行其他操作
 *    9. unknown 类型的值不能访问其属性、不能作为函数调用和作为类创建实例
 *    10. 使用 映射类型 时，如果遍历的是 unknown 类型，则不会映射任何属性 
 */

// 1. 
let value1: unknown
value1 = 100
value1 = 'aaa'
value1 = false

// 2. 
let value2: unknown
// let value3: string = value2    // error 不能将类型“unknown”分配给类型“string”
value2 = value1                   // ok

// 3. 
let value4: unknown
// value4 += 1                    // error 不能操作（自加）

// 4. 
type type1 = string & unknown       // string
type type2 = number & unknown       // number
type type3 = unknown & unknown      // unknown
type type4 = unknown & string[]     // string[]

// 5. 
type type5 = string | unknown       // unknown
type type6 = any | unknown          // any
type type7 = number[] | unknown     // any


// 6. 
// 条件类型：如三元运算符
type type8 = never extends unknown ? true : false     // any

// 7.
type type9 = keyof unknown          // never

// 8.
console.log(value1 !== value2);     // false
// value1 =+ value2                 // error

// 9.
let value5: unknown
// value5.age                       // error
// value()                          // error

// 10.
type TType<T> = {
  [P in keyof T]: number
}
type type10 = TType<any>            //  [x: string]: number;
type type11 = TType<unknown>        //  没有属性


// ----------------------- 条件类型 -------------------------
type Types<T> = T extends string ? string : number
let index: Types<'a'> = '123'           // let index: string
// let index2: Types<'a'> = 123         // error 不能将类型“number”分配给类型“string”
let index3: Types<false> = 123          // let index3: number

// ----------------------- 分布式条件类型 -------------------------
// 联合类型时，自动分化
type TypeName<T> = T extends any ? T : never
type AType = TypeName<string | number>    // type AType = string | number

type TypeNames<T> = 
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends undefined ? undefined :
  T extends () => void ? () => void :         // T extends Function ? Function
  Object;

type BType = TypeNames<() => void>      // type BType = () => void
type CType = TypeNames<string[]>        // type CType = Object
type DType = TypeNames<(() => void) | string[]>  // type DType = Object | (() => void)

type Diff<T, U> = T extends U ? never : T
type TestType = Diff<string | number | boolean, undefined | number>   // type TestType = string | boolean


type EType<T> = {
  // value 为函数则返回 函数名 的 字符串字面量类型
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]    // 索引访问，获取不为 never 的属性
interface Part {
  id: number,
  name: string,
  subParts: Part[],
  undatePart(newName: string): void,
  undatePart2(newName: string): void,
}
type Test = EType<Part>     // type Test = "undatePart" | "undatePart2"


// -------------------- 条件类型的类型推断 infer -------------------------

// T[number]: 索引访问，通过传入一个 number 类型的索引，获取到 其 值的类型
// 即 类型为数组，则返回数组成员的类型，不是数组则返回原类型
type FType<T> = T extends any[] ? T[number] : T
type Test1 = FType<string[]>      // 条件成立，返回 string[] =》['a', 'aa', 'aaa'] 的值的类型 即 string
type Test2 = FType<string>        // 条件不成立，返回 string

// 使用 infer
type GType<T> = T extends Array<infer U> ? U : T
type Test3 = GType<string[]>      // type Test3 = string
type Test4 = GType<string>        // type Test4 = string


// ------------------------- Exclude<T, U> ------------------------------
// 等同 上面定义的 Type Diff
type HType = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c'>      // type HType = "b" | "d"


// ------------------------- Extract<T, U> ------------------------------
// 选取 T 中可以赋值给 U 的类型
type IType = Extract<'a' | 'b' | 'c' | 'd', 'c'>           // type IType = "c"


// ------------------------- NonNullable<T> ------------------------------
// T 中取出 null & undefined
type JType = NonNullable<string | number | null | undefined>    // type JType = string | number


// ------------------------- ReturnType<T> ------------------------------
// 获取函数类型返回值类型
type KType = ReturnType<() => string>     // type KType = strings
type LType = ReturnType<() => void>       // type LType = void


// ------------------------- InstanceType<T> ------------------------------
// 获取构造函数的类型的实例类型
// type MType = InstanceType<>
class AClass {
  constructor () {}
}
type T1 = InstanceType<typeof AClass>   // type T1 = AClass
type T2 = InstanceType<any>             // type T1 = any
type T3 = InstanceType<never>           // type T1 = never
// type T4 = InstanceType<string>          // error string 不满足 new (...args: any) => any
