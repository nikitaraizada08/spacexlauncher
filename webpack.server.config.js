// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
var BrotliPlugin = require('brotli-webpack-plugin');
var CompressionPlugin= require('compression-webpack-plugin');
module.exports = {
  mode: 'none',
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts'
  },
  externals: {
    './dist/server/main': 'require("./server/main")'
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  optimization: {
    minimize: true
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
    // path: path.join(__dirname, 'dist/static'),
    // filename: '[name]_[chunkhash].js',
    // chunkFilename: '[id].[chunkhash].js',
    // publicPath: '/static/',
  },
  module: {
    noParse: /polyfills-.*\.js/,
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },     
        { test: /\.txt$/, use: 'raw-loader' }
     
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
    new BrotliPlugin({
      asset: '[fileWithoutExt].[ext].br',
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/
  }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      filename(info){
          let opFile= info.path.split('.'),
          opFileType =  opFile.pop(),
          opFileName = opFile.join('.');
          return `${opFileName}.${opFileType}.gzip`;
      }
  })
  ]
};
