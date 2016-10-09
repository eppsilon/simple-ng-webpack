const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const RXJS_BUNDLE_PATH = path.resolve(__dirname, './node_modules/rxjs/bundles/Rx.js');

function getAngular2Alias(moduleName) {
  return {
    ['@angular/' + moduleName]: path.resolve(__dirname, './node_modules/@angular/' + moduleName + '/bundles/' + moduleName + '.umd.js'),
  };
}

module.exports = {
  resolve: {
    alias: Object.assign({},
      getAngular2Alias('common'),
      getAngular2Alias('compiler'),
      getAngular2Alias('core'),
      getAngular2Alias('platform-browser'),
      getAngular2Alias('platform-browser-dynamic'), {
      'rxjs$': RXJS_BUNDLE_PATH,
      'rxjs/Observable$': RXJS_BUNDLE_PATH,
      'rxjs/Subject$': RXJS_BUNDLE_PATH,
      'rxjs/Subscription$': RXJS_BUNDLE_PATH
    })
  },
  entry: [
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './dist/main.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    exprContextCritical: false,
    loaders: [
      { test: /\.ts$/, loader: 'typescript' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html', to: './dist' }
    ])
  ],
  devServer: {
    contentBase: './dist'
  }
};
