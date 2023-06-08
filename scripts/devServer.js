const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const {
  outputPath,
} = require('../getOutputPath')
const webpackConfig = require('../webpack.config.js');

const webpackCompiler = (
  webpack(
    webpackConfig
  )
)

new webpackDevServer(
  (
    webpackConfig
    .devServer
  ),
  webpackCompiler
)
.start()
.then(() => {
  console
  .info('Listening on port: 3000')
})
