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
  entry: './src/libraryExport.js',
  externals: [
    'prop-types',
    'react',
    'react-dom',
    'react/jsx-pragma',
    'solid-js',
  ],
  mode: 'production',
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
    libraryTarget: 'umd',
    path: outputPath,
  },
}

module.exports = webpackConfig
