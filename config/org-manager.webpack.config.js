const path = require('path');

module.exports = {
  entry: {
    'org-manager': path.join(__dirname, '../app/src/client/org-manager.js'),
  },
  output: {
    path: path.join(__dirname, '../app/dist/org-manager/static/js'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'syntax-class-properties',
          ],
        },
      },
    ],
  },
  watch: true,
  stats: {
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
};
