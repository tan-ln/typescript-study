// 处理 public 等 目录下的静态文件
const shell = require('shelljs')

// 拷贝到 dist
shell.cp('-R', './public/', './dist/')
shell.cp('-R', './views/', './dist/')
