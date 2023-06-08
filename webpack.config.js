const {
  getAbsolutePath,
  outputPath,
} = require('./getOutputPath')

/** @type { import('webpack').Configuration } */
const webpackConfig = {
  devServer: {
    // contentBase: outputPath,
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    // publicPath: '/',
  },
  devtool: 'eval-source-map',
  entry: {
    reactBundle: './src/react/reactEntrypoint.tsx',
    solidBundle: './src/solid/solidEntrypoint.tsx',
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
    path: outputPath,
    publicPath: '/',
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
