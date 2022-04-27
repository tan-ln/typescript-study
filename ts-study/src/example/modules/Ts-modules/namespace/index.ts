// 内部模块：命名空间
// 外部模块：模块
/**
 *  命名空间 namespace && 模块
 *    1. 程序内部，防止外部全局污染，把相关内容放在一起时，建议使用命名空间
 *    2. 封装工具或库，适用于模块系统中的引入，使用 模块
 * 
 *    "/// <reference path="./namespace.ts">" (相对路径)
 *    tsc --outFile src/output/index.js src/example/modules/Ts-modules/namespace/index.ts    指定输出文件 和 编译文件
 */

// 使用规则
/// <reference path="./letter-validation.ts" />
/// <reference path="./number-validation.ts" />

// 如果不是通过 webpack 使用 命名空间，比如 tsc 直接使用，则只需要定义 reference

let isLetter = Validation.checkLetter('abc')
let isNumber = Validation.checkNumber(10000)
console.log(isLetter);
console.log(isNumber);

/**
 *  编译结果：
    var Validation;
    (function (Validation) {
        var isLetterReg = /^[a-zA-Z]+$/;
        Validation.checkLetter = function (text) {
            return isLetterReg.test(text);
        };
    })(Validation || (Validation = {}));
    var Validation;

    (function (Validation) {
        Validation.isNumberReg = /^[0-9]+$/;
        Validation.checkNumber = function (text) {
            return Validation.isNumberReg.test(text);
        };
    })(Validation || (Validation = {}));

    通过 export 导出的内容，都时在 Validation 对象上作为属性
    多个同名空间文件 合并为一个，不会冲突
 */
