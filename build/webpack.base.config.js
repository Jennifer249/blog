"use strict";
const path = require('path');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

function resolve (dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: "./client/main.js"
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: path.join(__dirname, "../dist/"),
    publicPath: "/"   //如果是build得到的，需要设置成./
  },
  module: {
    rules: [
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
    },
    {
        test: /\.(png|svg|jpg|gif|svg)$/,
        loader: "url-loader",
        exclude: [resolve('client/icons')],
        options: {
          name: "images/[name]-[hash:6].[ext]",
          limit: 10000
        }
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          name: "images/[name]-[hash:6].[ext]",
          limit: 10000
        }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [resolve('client')]
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader'
    },
    {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('client/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', 'jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('client')

    }
  },
  plugins: [
    new VueLoaderPlugin()
    // new CleanWebpackPlugin()
  ]
};