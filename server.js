var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.development');


new WebpackDevServer(webpack(config), {
  contentBase: "./dist",
  hot: false,
  historyApiFallback: true,
  disableHostCheck:true,
  proxy: {
    "/api": "http://localhost:8080"
  }  
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
