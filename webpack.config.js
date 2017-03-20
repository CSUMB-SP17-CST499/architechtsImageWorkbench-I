var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
  enrty: APP_DIR + '/index.js';
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
