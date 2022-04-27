export {}

// mixin 混入

const a = { a: 'a' }
const b = { b: 'b' }
const res = Object.assign(a, b)
console.log(a);         // {a: "a", b: "b"}
console.log(b);         // {b: "b"}

// 1. 对象混入
interface ObjectA {
  a: string
}
interface ObjectB {
  b: string
}
let aa: ObjectA = {
  a: 'aaa'
}
let bb: ObjectB = {
  b: 'bbb'
}
// let ab: ObjectA & ObjectB
// 交叉类型，ts 自动推断
let ab = Object.assign(aa, bb)
console.log(ab);                // {a: "aaa", b: "bbb"}


// 2. 类混入
class ClassA{
  public isA: boolean = false
  public funA () {}
}
class ClassB{
  public isB: boolean = false
  public funB () {}
}
class AplusB implements ClassA, ClassB {
  isA: boolean = false
  isB: boolean = false
  funcA!: () => void
  funcB!: () => void
  constructor () {}
  public funB(): void {
    throw new Error("Method not implemented.");
  }
  public funA(): void {
    throw new Error("Method not implemented.");
  }
}
function mixins (base: any, from: any[]) {
  from.forEach(item => {
    Object.getOwnPropertyNames(item.prototype).forEach((key: any )=> {
      console.log(key);
      base.prototype[key] = item.prototype[key]
    })
  })
}

mixins(AplusB, [ClassA, ClassB])
const a_b = new AplusB()
console.log(a_b);

/**
isA: false
isB: false
__proto__: {
  funB: ƒ ()
  funA: ƒ ()
  constructor: ƒ ClassB()
  __proto__: Object
}
 */
