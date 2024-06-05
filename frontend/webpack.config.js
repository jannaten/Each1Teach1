const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /styleConverter/, /unused-code/],
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'commonjs',
                targets: {
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },

      {
        test: /\.(css|scss)$/,
        exclude: [/styleConverter/, /unused-code/],
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        exclude: [/styleConverter/, /unused-code/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [path.join(__dirname, 'node_modules')]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
      // minify: {
      // 	removeComments: false
      // }
    }),
    new webpack.DefinePlugin({
      API_VERSION: JSON.stringify(process.env.SERVER_API_VERSION),
      PROCESSING_TIME: JSON.stringify(process.env.PROCESSING_TIME)
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
        const prefix =
          cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
        return `${prefix}~${allChunksNames}`;
      }
    }
  }
};

const developmentConfig = {
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true, // false = files in contentBase won't trigger reload
    clientLogLevel: 'silent',
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    host: '0.0.0.0',
    port: process.env.CLIENT_CONTAINER_PORT,
    public: `localhost:${process.env.CLIENT_PUBLIC_PORT}`,
    //disableHostCheck: true,
    proxy: {
      '/api': {
        target: `http://server:${process.env.SERVER_CONTAINER_PORT}`
      }
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: true,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      SERVER_PUBLIC_PORT: JSON.stringify(
        `http://127.0.0.1:${process.env.SERVER_PUBLIC_PORT}`
      )
    })
  ]
};

const productionConfig = {
  devtool: false
};

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found');
  }
};
