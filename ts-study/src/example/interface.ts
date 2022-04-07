export {}

// const getFullName = ({ firstName, lastName }) => {
//   return `firstName: ${firstName}, lastName: ${lastName}`
// }

// const obj = {
//   firstName: 'tan',
//   lastName: 'ln'
// }
// getFullName(obj)

interface NameInfo {
  firstName: string,
  readonly lastName: string
}

// const getFullName = ({ firstName, lastName }: { firstName: string, lastName: string }): string => {
const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `firstName: ${firstName}, lastName: ${lastName}`
}

const obj = {
  firstName: 'tan',
  lastName: '18'
}
getFullName(obj)

// 数组接口
interface ArrInterface {
  0: number,
  readonly 1: string
}
let arr: ArrInterface = [0, '0']
// arr[1] = ''


// 函数接口
interface addFun {
  (n1: number, n2: number): number
}
// ts 建议使用 type 类型别名
// type addFun = (n1: number, n2: number) => number

const add: addFun = (n1, n2) => n1 + n2
add(10, 0)

// 索引
interface IdInterface {
  [id: number]: string
}
const r1: IdInterface = {
  0: 'root'
}


// 接口继承
interface Person {
  age: number
}
interface A extends Person {
  car: string
}
const a: A = {
  age: 100,
  car: 'AMG'
}

// 
interface Counter {
  (): void,
  count: number
}
const getCounter = (): Counter => {
  const c = () => {
    c.count++
  }
  c.count = 0
  return c
}
const counter: Counter = getCounter()
counter()
console.log(counter.count);         // 1
counter()
console.log(counter.count);         // 2
counter()
console.log(counter.count);         // 3

