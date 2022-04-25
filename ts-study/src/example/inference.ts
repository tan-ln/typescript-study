export {}

// 类型推论和 类型兼容性

window.onmousedown = (event) => {
  console.log(event);
}

interface Info {
  name: string,
}

let infos: Info
const info1 = { name: '00' }
const info2 = { age: 100 }
const info3 = { name: '00', age: 100 }

infos = info1
// infos = info2         // Property 'name' is missing
infos = info3