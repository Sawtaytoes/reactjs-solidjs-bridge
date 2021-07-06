const path = require('path')

const getAbsolutePath = (
  filePath,
) => (
  path
  .join(
    (
      process
      .cwd()
    ),
    filePath,
  )
)

const outputPath = (
  getAbsolutePath(
    './dist'
  )
)

const webpackConfig = {
  devServer: {
    contentBase: outputPath,
    host: '0.0.0.0',
    hot: true,
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  entry: {
    reactBundle: './src/react/reactEntrypoint.jsx',
    solidBundle: './src/solid/solidEntrypoint.jsx',
  },
  mode: 'development',
  module: {
    rules: [
      {
        include: (
          getAbsolutePath(
            './src/react'
          )
        ),
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
          },
        },
      },
      {
        include: (
          getAbsolutePath(
            './src/solid'
          )
        ),
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              'babel-preset-solid',
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: outputPath,
  },
  // plugins: [],
}

module.exports = webpackConfig
