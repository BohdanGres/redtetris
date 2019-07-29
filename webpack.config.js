// var path = require('path');
//
// module.exports = {
//   entry: './src/client/index.js',
//
//   output: {
//     path: path.join(__dirname, 'build'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       exclude: /node_modules/,
//       loader: 'babel',
//       query:{
//         presets: ["es2015", "react", "stage-0"]
//       }
//     }]
//   }
// };



module.exports = {
  entry: {
    main: './src/client/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        options: {
          configFile: './.babelrc'
        }
      }
    ]
  }
};

// module.exports = {

// };
