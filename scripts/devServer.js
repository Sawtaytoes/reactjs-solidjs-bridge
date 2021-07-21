const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config.js');

const webpackCompiler = (
  webpack(
    webpackConfig
  )
)

new webpackDevServer(
  webpackCompiler
)
.listen(
  3000,
  () => {
    console
    .info('Listening on port: 3000')
  },
)
