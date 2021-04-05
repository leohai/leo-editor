const path = require('path')
const resolve = (dir) => path.join(path.resolve(__dirname, '../'), dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry:resolve('src/index.ts'),
  output: {
    path: resolve('dist'),
    filename:'index.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve('src/'),
    }
  },
  module: {
    rules: [
      {//通用scss配置
        test: /\.scss$/i,
        exclude:resolve("src/components"),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders:2
            }
          }
          ,'postcss-loader'
          , 'sass-loader'
        ],
      },
      {
        //组件化moudle scss配置
        test: /\.scss$/i,
        include:resolve("src/components"),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders:2,
              modules: {
                 localIdentName: "leo-[local]"
              }
            }
          }
          ,'postcss-loader'
          , 'sass-loader'],
      },
      {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        use: ['babel-loader','ts-loader'],
        exclude: /node-modules/ 
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({template:resolve('src/index.html')}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()]
}