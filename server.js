var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  port: 3000,
  host: '0.0.0.0',
  allowedHosts: [
    'localhost',
    '0.0.0.0'
  ],
  stats: {
    colors: true
  }
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
