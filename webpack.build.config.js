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
  entry: './src/libraryExport',
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
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-typescript',
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
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-typescript',
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
    filename: '[name]',
    libraryTarget: 'umd',
    path: outputPath,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },
}

module.exports = webpackConfig
