class Point {
  public x: number
  public y: number
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getPosition () {
    return `x: ${this.x}, y: ${this.y}`
  }
}

const p1 = new Point(1, 2)
// console.log(p1);

// ------------- 修饰符 ---------------------
// 1. public
// 2. private 只能在 类当中访问
// 3. protected 
class Parent {
  public name: string
  private age: number
  protected money : number
  constructor (name: string, age: number, money: number) {
    this.name = name
    this.age = age
    this.money = money
  }
  protected getMoney () {
    return this.money
  }
}

const p2 = new Parent('tan', 100, 0)
// console.log(p2.name);       // tan
// console.log(p2.age);        // Property 'age' is private and only accessible within class 'Parent'
// console.log(Parent.age);    // Property 'age' does not exist on type 'typeof Parent' 实际上是定义在 实例上的属性，但实例访问不到

class Child extends Parent {
  constructor (name: string, age: number, money: number) {
    super(name, age, money)
    // console.log(this.age);         //  Property 'age' is private and only accessible within class 'Parent'
    // console.log(super.money);      // super 只能访问  public and protected 方法，不能访问 protected 属性
    console.log(super.getMoney());
  }
}

// ------------- readOnly ---------------------
class UserInfo {
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }
}

const user = new UserInfo('tan')
// console.log(user);
// user.name = '000'           // error: Cannot assign to 'name' because it is a read-only property.


// ------------- 参数属性 ---------------------
class A {
  // 指定属性 为 public 属性，并挂在实例上
  constructor (public name: string) {}
  // constructor (private name: string) {}
}

const a1 = new A('00')
// console.log(a1.name);             // constructor 不加参数属性 public 则实例无法访问


// ------------- 静态属性 ---------------------
class P {
  public static age: number = 18
  public static getAge () {
    return P.age
  }
  private static getAgeToo () {
    return P.age
  }
  constructor() {}
}
const p = new P()
// console.log(p.getAge());
// console.log(P.getAge());
// console.log(P.getAgeToo());   // 私有只能在 类 P 当中访问

// ------------- 存取器 ---------------------
class Info {
  public name: string
  public age?: number
  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  }
  get infoStr () {
    return `${this.name} is ${this.age} years old.`
  }
  set infoStr (value) {
    console.log(`new value: ${value}`);
  }
}
const info = new Info('tan', 100)
// console.log(info.infoStr);              // tan is 100 years old.
info.infoStr = 'nothing'                // new value: nothing

// ------------- 抽象类 ---------------------
// 一般用来被其他类继承，而不直接用它创建实例
// 不仅可以用来标记标记 类以及 类当中的方法，还可以 标记属性和存取器

abstract class People {
  public abstract __name: string
  public abstract printName (): void
  abstract get insideName (): string
  abstract set insideName (value: string)

  constructor (public name: string) {}
}
// const people1 = new People()      // 无法创建 抽象类 实例

class Man extends People {
  public __name: string = ''
  public printName(): void {
    console.log(this.name);
  }
  get insideName(): string {
    return this.name
  }
  set insideName(value: string) {
    console.log(value);
  }

  constructor (name: string) {
    super(name)
    this.name = name
  }
}
const man1 = new Man('man1')
man1.printName()


// ------------- 实例属性 ---------------------
// 即是值 也是 类型
let aa: A = new A('aaaaa')
class B {
  constructor (public name: string) {}
}
aa = new B('bbb')


// ------------- 类的类型接口 ---------------------
// 使用接口可以强制一个类的定义必须包含某些内容
interface FoodInterface {
  type: string;       // 接口当中不是一个 对象，而是 声明语句，代码块，可以用 ; | , | 或是不写
}
class FoodClass implements FoodInterface {
  public type: string
  constructor (type: string) {
    this.type = type
  }
}

// ------------- 接口继承类 ---------------------
// 继承类的成员，不包括实现
// 包含 private | protected 时，接口只可被 这个类或它的子类实现

class M {
  protected name: string = ''
}
interface I extends M {}
// class N implements I {}         // error 只能被其子类实现 protected
class N extends M implements I {}


// ------------- 泛型中使用 类 类型 ---------------------
// new 指调用传入的 类的构造函数，它类型即 类 类型
const create = <T>(c: new() => T): T => {
  return new c()
}
class Data {
  public age: number = 100
}
create<Data>(Data)
console.log(create<Data>(Data).age);            // 100

