export {}

// 声明的合并

// --------------------- interface -----------------------
// 接口的声明可以重复
// 重复声明的接口将会 合并 merge
interface IInfo {
  name: string;
  getRes(input: string): number;
}
interface IInfo {
  // name: number;       // error 属性 若是重复，类型必须相同
  age: number;
  getRes(input: number): string;  // 函数若是重复，则 函数重载
}

let info: IInfo = {
  name: 'tang',
  age: 100,
  getRes (text: any): any {
    if (typeof text === 'string') { return text.length }
    else { return String(text) }
  }
}
console.log(info.getRes(123));      // 123
console.log(info.getRes('123'));    // 3


// --------------- class 和 namespace 的合并 -----------------
// class 需要写在前面
// 结果是一个包含命名空间导出的结果为静态属性属性的类
class Validations {
  constructor () {}
  public checkType () {}
}
namespace Validations {
  export const numberReg = /^[0-9]+$/
}

console.dir(Validations)                // ƒ Validations()
console.log(Validations.numberReg)      // /^[0-9]+$/


// --------------- function 和 namespace 的合并 -----------------
// 函数也是对象，可以给函数添加属性
// function 需要写在前面
function countUp () {
  countUp.count++
}
namespace countUp {
  export let count = 0
}
console.log(countUp.count);         // 0
countUp()
console.log(countUp.count);         // 1


// --------------- enum 和 namespace 的合并 -----------------
// 可以为 枚举 拓展内容
// 先后顺序没有要求
enum Colors {
  red,
  green,
  blue
}
namespace Colors {
  export const yellow = 3
}

// {0: "red", 1: "green", 2: "blue", red: 0, green: 1, blue: 2, yellow: 3}
console.log(Colors);   

