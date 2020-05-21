const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = ['source-map'].map(devtool => ({
  mode: 'development',
  entry: './lib/server.js',
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'phimaser',
    libraryTarget: 'commonjs-module'
  },
  devtool,
  optimization: {
    runtimeChunk: true
  },
  externals: ['fs']
}))
