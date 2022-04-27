/**
 *  命名空间 namespace
 *    相当于定义一个大的对象，其中可以定义 变量方法接口类等等
 *    如不使用 export 向外暴露，则外部无法访问到
 */

namespace Validation {
  const isLetterReg = /^[a-zA-Z]+$/
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text)
  }
}
