// 导出

export interface FuncInterface {
  name: string;
  (arg: number): string;
}
export class ClassA {
  constructor () {}
}
class ClassB {
  constructor () {}
}

export { ClassB }
export { ClassB as classNamedB }

// 导入再导出
export * from './2'
export { a } from './2'
export { age as propAge } from './2'
