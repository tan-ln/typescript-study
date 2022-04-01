# Flow

1. `yarn init -y`
2. 安装 flow-bin 模块: `yarn add flow-bin -D`
3. 创建配置项 `yarn flow init` ==> `.flowconfig`

## 类型检查

### 类型注解
```js
// @flow
function sum (a: number, b: number) {
  return a + b
}
sum(1, 2)
sum('12', '34')   // Cannot call sum with '12' bound to a because string [1] is incompatible with number [2]. [incompatible-call]
```
> `yarn flow` 进行检查

### flow-remove-types 移除注解
> flow 仅用于编码时找出错误，编码完成后需移除注解

1. 安装 `yarn add flow-remove-types -D`

2. 运行 `yarn flow-remove-types src -d dist`

  * `src` 表示当前文件所在目录
  * `-d` 指定输出目录 如 dist

```js
//      

function sum (a        , b        ) {
  return a + b
}

sum(1, 2)
sum('12', '34')
```

### babel 移除注解
`$ yarn add @babel/core @babel/cli @babel/preset-flow -D`

1. 创建 `.babelrc`
```js
{
  "presets": ["@babel/preset-flow"]
}
```
2. 运行
`yarn babel src -d dist`

3. 结果
```js
function sum(a, b) {
  return a + b;
}

sum(1, 2);
sum('12', '34');
```

## 各种类型

### 原始类型
```js
// @flow
const a: string = 'string'
const b: number = 100 || NaN || Infinity
const c: boolean = false || true
const d: null = null
const e: void = undefined
const f: symbol = Symbol()
```

### 数组
```js
// 泛型
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 固定长度的数组 === 元组
const foo: [string, number] = ['foo', 100]
```

### 对象
```js
const obj1: { str: string, num: number} = { str: 'string', num: 100 }

// 表示可选 ?
const obj2: { str?: string, num: number} = { num: 100 }

// 动态设置属性
// 可使用 索引
// 表示可以添加任意属性，但类型为 string
const obj3: { [string]: string } = {}
obj3.key1 = 'string'
// obj3.key2 = 100             // error
```

### 函数
```js
// 返回值类型 void
function fn (callback: (string, number) => void) {
  callback('string', 100)
}
fn(function (str, num) {
  // 无返回值或 undefined
  return undefined
})
```

### 特殊类型
```js
// 1. 字面量
const aaa: 'aaa' = 'aaa'

const type: 'success' | 'warning' | 'danger' = 'success'      // 三选一，其他则报错

type StringOrString = string | number
const bbb: StringOrString = 'string'

// 2.
// ?number 表示还可以支持 null | undefined 类型
const gender: ?number = null

// ----------------------------------
// mixed 接受任意类型的值
function passMixed (value: mixed) {
  // mixed 强类型
  // 直接使用会报错
  // value.substr(1)
  // value * 10
  if (typeof value === 'string') {
    value.substr(1)
  }
}
passMixed('string')
passMixed(100)

// ----------------------------------
// any 接受任意类型的变量
function passAny (value: any) {
  // any 弱类型
  // 都不会报错
  value.substr(1)
  value * 10
}
passAny('string')
passAny(100)
```

### 运行环境
```js
// @flow
const ele:HTMLElement | null =  document.getElementById('app')
```
