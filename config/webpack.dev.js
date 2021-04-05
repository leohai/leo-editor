
const { merge } = require('webpack-merge');
const path = require('path')
const baseConfig = require('./webpack.base.js')
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname,'../dist'),
    hot: true,
  },
})