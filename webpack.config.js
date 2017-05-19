var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: APP_DIR + '/index',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.json$/,
	loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ["", '.js', '.json', '.jsx']
  }
};

module.exports = config;
