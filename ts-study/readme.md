1. `npm i typescript -g`
2. `tsc --init` 生成配置文件 `tsconfig.json`
3. `npm i webpack webpack-cli webpack-dev-server -D`

配置 `build/webpack.config.js`

### cross-env
package.json 配置 环境变量 为开发环境
```js
"start": "cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.config.js"
```

## 基础类型
```ts
export {}

// --------------------------------------------------
// 布尔类型
let boo: boolean
// let boo: boolean = true || false

// --------------------------------------------------
// 数值
let num: number = 123     // NaN || Infinity
num = 0b1111011           // ES6 支持 二进制 | 八进制 | 十六进制的值
num = 0o173               // 八进制
num = 0x7b                // 十六进制的值

// --------------------------------------------------
// 字符串
let str: string
str = '123'
str = `num=${num}`
// console.log(str);

// --------------------------------------------------
// 数组
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]
const arr3: (string | number)[] = ['a', 2, 3]

// --------------------------------------------------
// 元祖类型
// 固定长度，固定类型
let tuple: [string, number, boolean] = ['aaa', 123, true]
// tuple = ['aaa', 123, true, 'asd']             // 2.6 版本之后不支持越界元素(超出长度但复合类型的值)

// --------------------------------------------------
// 枚举类型
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER = 'user'
}

// console.log(Roles);           // {0: 'SUPER_ADMIN', 1: 'ADMIN', 2: 'USER', SUPER_ADMIN: 0, ADMIN: 1, USER: 2}
// console.log(Roles.USER);     // 1

// --------------------------------------------------
// any 任意类型
let val:any = 'any value'
const arr4: any[] = [1, 'a']

// --------------------------------------------------
// void 类型
// 如：函数无返回值 不指定则为 undefined
const foo = (txt: string): void => {
  console.log(txt)  
}
foo('123')

let v: void = undefined       // 允许 将 undefined 赋给 void 类型的值
// v = null                      // void 在严格模式下只能 undefined  （strictNullChecks: true）

// --------------------------------------------------
// null && undefined 在 ts 中即是类型也是值
// 是其他类型的 子类型 （可以把这俩赋给其他任意类型作为值）非 strict 模式
let und: undefined = undefined
let nu: null = null

// --------------------------------------------------
// never 永远不存在的值
// never 类型是任何类型的子类型
// 1. 异常抛出
const errFn = (msg: string): never => {
  throw new Error(msg)
}
// 2. 死循环
// const infinityFn = (): never => {
//   while(1) {}
// }

// --------------------------------------------------
// Object
function bar(obj: object): void {
  console.log(obj);
}
bar({})


// --------------------------------------------------
// 类型断言
const getLength = (target: string | number): number => {
  // 强制指定类型 || 类型保护
  if ((<string>target).length || (<string>target).length === 0) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}

console.log(getLength(123))
console.log(getLength('123123'))
```

## 使用 ESlint
`npm install eslint -D`
> `TSLint` 和 `ESLint` 功能一致，有这大量重复的代码，不再继续维护，推荐使用ESLint来替代

安装完成后, `yarn eslint --init` 自定义设置，生成 `eslintrc.json`