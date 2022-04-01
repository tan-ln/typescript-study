// @flow

let num: number = 100
// num = 'sth'                 // 报错

function foo (): void {
  // 没有返回值
  // 默认 undefined
  // 需要标记类型为 void
}

foo()
