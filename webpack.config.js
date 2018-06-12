var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'public') + '/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public') + '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          }
        ]
      }
};