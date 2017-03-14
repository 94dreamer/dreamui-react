var path = require('path');
var webpack=require('webpack');
var project = require('./package.json');
var react = path.resolve(__dirname,'node_modules', 'react/dict/react.js');
var autoprefixer = require("autoprefixer");

const config = {
  entry: {
    'bundle': './src/DreamUIReact'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'DreamUIReact',
    libraryTarget: 'umd',
    filename: 'DreamUIReact.js'
  },
  externals: {
    "jquery": "jQuery",
    "react": "React",
    "react-dom": "ReactDOM",
    "zepto": "Zepto",
    "react-draggable-browser": "react-draggable-browser",
    "swiper": "swiper",
    "cropperjs": "cropperjs",
    "jquery-mousewheel": "jquery-mousewheel"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: 'babel-loader',
        // query: {
        //   presets: ['es2015', 'stage-0', 'react']
        // }
        loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=stage-0,presets[]=react',
      },
      {
        test: /\.css$/,
        //注意，因为例如ImageEditor.jsx/Slider.jsx代码中引用了node_modules下的css，所以此处不能排除掉node_modules目录
        use: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: 'url-loader'
      }
    ],
    noParse: /react/
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer({browsers: ['> 0.1%']})],
      }
    })
  ]
};

//config.plugins.push(new webpack.optimize.UglifyJsPlugin());
module.exports = config;