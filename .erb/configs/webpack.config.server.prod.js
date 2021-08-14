import path from 'path';

const { name } = require('../../package.json');
module.exports = {
  mode: 'production',
  entry: {
    app: './src/server/index.ts',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../../src/dist'),
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
