const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackBuildConfig = require('../webpack.build.config');

const webpackCompiler = (
  webpack(
    webpackBuildConfig
  )
)

webpackCompiler
.run((
  error,
  stats,
) => {
  error
  ? (
    console
    .error(
      error
    )
  )
  : (
    console
    .info(
      Array
      .from(
        stats
        .compilation
        .modules
      )
      .map(({
        error,
      }) => (
        error
      ))
      .filter(
        Boolean
      )
    )
  )
})
