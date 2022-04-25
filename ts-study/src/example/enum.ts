enum Status {
  Pedding = 2,
  Success,
  Failed,
}

console.log(Status['Pedding']);   // 2
console.log(Status.Failed);       // 4

const su = 100
const fo = () => 200
enum Status2 {
  Pedding = 2,
  Success = su,         // 设置常量或者 计算方法后 的 成员必须 初始化值
  Failed = fo(),
}

console.log(Status2['Success']);   // 100
console.log(Status2.Failed);       // 200

// ------------------ 反向映射 ---------------------
console.log(Status2['100']);       // Success

// ------------------ 字符串枚举 ---------------------
// 要求每个字段个值都是字符串字面量，或者是另一个枚举字符串成员

enum Msg {
  Success = 'Yes !',
  Error = 'No !!!',
  Failed = Error
}
console.log(Msg.Success);
console.log(Msg.Failed);

// ------------------ 异构枚举 ---------------------
// 即包含字符串又包含数字的值
enum Result {
  Failed = 0,
  Success = 'Success'
}

// ------------------ 可以作为类型使用 ---------------------
// 1. enum E { A } 没有初始值
// 2. enum E { a = 'a' } 全部为 字符串
// 3. enum E { a = -1 } 全部为 数值

enum Animals {
  Dog = 1,
  Cat = 2,
}

interface Dog {
  type: Animals.Dog
}

const dog: Dog = {
  type: Animals.Dog,
  // type: 1,
  // type: Animals.Catr,                     // error 类型不匹配
}

// ------------------ 联合枚举类型 ---------------------
enum State {
  Off,
  On,
}

interface LightState {
  state: State
}

const light: LightState = {
  state: State.On,
  // state: Animals.Dog,                       // error
}

const enum States {
  Success = 200,
  NotFound = 404
}
const res = States.Success
// 使用 const 声明之后的枚举 编译结果
// const res = 200 /* Success */;

// 不使用
/**
 * 
    var States;
    (function (States) {
        States[States["Success"] = 200] = "Success";
        States[States["NotFound"] = 404] = "NotFound";
    })(States || (States = {}));
    const res = States.Success;
 */

