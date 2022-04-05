export {}

// symbol 独一无二的值
const sym = Symbol()
// console.log(sym)         // Symbol()

const s1 = Symbol('tan')
const s2 = Symbol('tan')

// console.log(s1 === s2);           // error

const s3 = Symbol(100)
// console.log(s3 + 200);              // 不能使用运算符 或 + 拼接

console.log(s3.toString() + 200);      // toString() + 拼接

console.log(!s3);      // false 自动隐式转换

let s4 = Symbol('name')
const obj = {
  [s4]: 's4',
  a: 'aaa',
  b: '1231'
}
// console.log(obj);       // {Symbol(name): 's4'}
// console.log(obj.s4);       // error
obj[s4] = 'volvo s60'
// console.log(obj);       // {Symbol(name): 'volvo s60'}

for (let key in obj) {
  console.log(key);         // a, b |       Symbol 类型不会被遍历出来
}

// console.log(Object.keys(obj))                           //  ['a', 'b']  同样不会
// console.log(Object.getOwnPropertyNames(obj))            //  ['a', 'b']  同样不会

// console.log(JSON.stringify(obj))            //  {"a":"aaa","b":"1231"}  同样不会

// console.log(Object.getOwnPropertySymbols(obj))            // [Symbol(name)] 只返回 symbol 类型的属性名 key

// console.log(Reflect.ownKeys(obj))            // ['a', 'b', Symbol(name)]    返回所有


const s7 = Symbol.for('haha')
// 再次使用 for 方法创建 symbol 的时候，会先判断 全局是否存在使用 string haha 的值，有则直接返回，没有则创建
const s8 = Symbol.for('haha')
// console.log(s7 === s8);     // true

const s9 = Symbol.keyFor(s8)
const s10 = Symbol.keyFor(s4)
console.log(s9);              // haha        只接受  Symbol.for 方法创建的值
console.log(s10);             // undefined

