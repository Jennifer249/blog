"use strict";
const merge = require('webpack-merge');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  module: {
    rules: [
    {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
         ]
    },
    {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
            loaders: {
              css: [ miniCssExtractPlugin.loader, "css-loader" ]
            }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new miniCssExtractPlugin({
        filename: "styles/[name].css"
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(srcPath, 'doc'),   //将一个目录的内容复制到另一个目录下
    //     to: path.join(distPath, 'doc')
    //   }
    // ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',  //输出路径名,相对于output.path
      template: path.join(__dirname,'../client/app/index.html'),  //本地模板地址
      favicon: 'client/assets/images/favicon.png',
      inject: true  //向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          chunks: 'initial', //把非动态模块打包进 vendor，动态模块优化打包
          reuseExistingChunk: true,
          minSize: 0,
          minChunks: 1
        },
        common: {
          chunks: 'initial',
          reuseExistingChunk: true
          minSize: 0,
          minChunks: 2
        }
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
});