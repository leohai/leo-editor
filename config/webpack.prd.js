
const { merge } = require('webpack-merge');
const path = require('path')
const baseConfig = require('./webpack.base.js')
module.exports = merge(baseConfig, {
  output:{
    path: path.resolve(__dirname,'../dist'),
    filename:'index.js',
    libraryTarget: 'umd', // 打包方式
    library: 'L', // 导出变量
    libraryExport: 'default', // 默认导出
  },
  mode:'production',
  devtool: 'cheap-module-source-map',
})