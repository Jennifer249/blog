"use strict"
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',  // 省去全局变量development配置、NamedModulesPlugin配置
  devtool: config.dev.devtool, // 生产环境生成map
  devServer: {
    historyApiFallback: true,
    hotOnly: true, //  相比较于hot，当HMR出现错误时，会出现HMR的错误信息
    compress: true,
    proxy: config.dev.proxyTable,
    contentBase: false,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.assetsPublicPath,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
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
      filename: 'index.html',  // 输出路径名,相对于output.path
      template: 'index.html',  // 本地模板地址
      inject: true,  // 向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
    }),
    new webpack.DefinePlugin({
      'process.env.SERVER_ENV': JSON.stringify(process.env.SERVER_ENV)
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
  ]
});

module.exports = webpackConfig;
