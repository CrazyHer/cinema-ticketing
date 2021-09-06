const webpackPaths = require('./webpack.paths.js');

const { name } = require('../../package.json');
module.exports = {
  mode: 'production',
  entry: {
    app: './src/server/index.ts',
  },
  target: 'node',
  output: {
    path: webpackPaths.distServerPath,
    filename: `${name}-server.js`,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [],
};
