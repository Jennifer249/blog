"use strict"
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
  mode: 'development',  //省去全局变量development配置、NamedModulesPlugin配置
  devtool: 'cheap-module-eval-source-map', //生产环境生成map
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',  //输出路径名,相对于output.path
      template: path.join(__dirname,'../src/index.html'),  //本地模板地址
      inject: true  //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
    }),
    //将一个目录的内容复制到另一个目录下
    new CopyWebpackPlugin({
        patterns: [{
            from: path.join(__dirname,'../static'),
            to: 'static',
            globOptions: {
                ignore: [
                    '**/.*'
                ]
            }
        }]
    }),
    new webpack.NoEmitOnErrorsPlugin() // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
  ]
});
