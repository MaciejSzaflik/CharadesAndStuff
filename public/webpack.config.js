var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        loader: "style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]",
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: "style!css?modules",
        include: /flexboxgrid/
      }
    ]
  },
  modulesDirectories: ['./src/shared', './node_modules'],
  plugins: [HTMLWebpackPluginConfig]
};