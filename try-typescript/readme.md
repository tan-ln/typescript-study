# Typescript

`yarn add typescript -D`

## try
```js
// 可以完全按照 JavaScript 最新标准 语法编写
const hello = name => {
  console.log(`Hello, ${name} ye`)
}
hello('Typescript')
```
`$ yarn tsc src/1.ts`

## 配置
`$ yarn tsc --init` 生成 tsconfig.json

`yarn tsc`

## 原始数据类型
```ts
const a: string = 'string'
const b: number = 100       // NaN || Infinity
const c: boolean = true || false

// 上面三种可以为空 (null || undefined) 非严格模式下

const d: void = undefined      // undefined 严格模式下只能 undefined
const e: null = null
const f: undefined = undefined

const g: symbol = Symbol()
```

## 作用域问题
```ts
// 1. 立即执行函数
(function () {
  const a: number = 100
})()
```
```ts
// 2. 模块作用域
const a: number = 100
// 语法，不是导出一个空对象
export {}
```