var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './index'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        "BITBUCKET_CLIENT_ID": JSON.stringify(process.env.BITBUCKET_CLIENT_ID)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel?stage=0'], exclude: /node_modules/ }
    ]
  },
  cssnext: {
    browsers: 'last 2 versions'
  }
};
