"use strict";
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),  //这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id
    new HtmlWebpackPlugin({
      filename: 'index.html',  //输出路径名,相对于output.path
      template: path.join(__dirname,'../client/index.html'),  //本地模板地址
      favicon: 'client/assets/images/favicon.png',
      inject: true  //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(srcPath, 'doc'),   //将一个目录的内容复制到另一个目录下
    //     to: path.join(distPath, 'doc')
    //   }
    // ]),
    new webpack.NoEmitOnErrorsPlugin() // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    
  ]
});