module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    plugins: ['karma-webpack', 'karma-babel-preprocessor', 'karma-mocha', 'karma-chai', 'karma-chrome-launcher'],
    files: ['test/index.js'],
    preprocessors: {'test/index.js' : ['webpack']},
    webpack: {
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: {
              loader: 'babel-loader',
              options: {
                presets: ['babel/preset-env', 'react'],
              }
            }}
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        "presets": ["babel/preset-env"]
      }
    }
  })
}
