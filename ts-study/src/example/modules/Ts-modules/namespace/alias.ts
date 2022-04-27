namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire {}
  }
}

// import 关键字
// 别名 可以解决深层次的 嵌套
import polygons  = Shapes.Polygons
let triangle = new polygons.Triangle()
