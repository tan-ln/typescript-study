const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js'
  },
  // resolve 配置 webpack 如何寻找模块所对应的文件
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      // build 之前清理指定路径的文件
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      // 指定编译模板入口文件
      template: './index.html',
      favicon: './build/favicon-32x32.png'
    })
  ],
  // 方便开发阶段调试的时候定位代码位置，生产上线后不需要
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: false,          // 不启用压缩
    host: 'localhost',
    port: 5000,
    // 服务启动后的打印信息
    stats: 'errors-only'
  }
}
