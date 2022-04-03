1. `npm i typescript -g`
2. `tsc --init` 生成配置文件 `tsconfig.json`
3. `npm i webpack webpack-cli webpack-dev-server -D`

配置 `build/webpack.config.js`

### cross-env
package.json 配置 环境变量 为开发环境
```js
"start": "cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.config.js"
```