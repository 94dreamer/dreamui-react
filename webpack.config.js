var path = require('path');
var webpack=require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var autoprefixer = require("autoprefixer");

var ENV = process.env.NODE_ENV;
var config = {
  entry:{
    'example':'./examples/example.js'
  },
  output:{
    //publicPath:"./dist/",
    path:"./examples/dist/",
    filename:'example.js',
    chunkFilename:'chunk/[name].[chunkhash:8].js'
  },
  // externals: [
  //   {
  //     "jquery": "jQuery",
  //     "react": "React",
  //     "react-dom": "ReactDOM",
  //   }
  // ],
  module:{
    rules:[
      {
        test:/\.(jsx|js)?$/,
        exclude:/(node_modules)/,
        loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=stage-0,presets[]=react',
      },
      {
        test:/\.(scss|sass)?$/,
        exclude:/(node_modules)/,
        loader:'style!css!postcss!sass'
      },
      {
        test:/\.css?$/,
        exclude:/(node_modules)/,
        //注意，因为例如ImageEditor.jsx/Slider.jsx代码中引用了node_modules下的css，所以此处不能排除掉node_modules目录
        loader:'style-loader!css-loader'
      },
      {
        test:/\.(jpg|png|gif|jpeg)?$/,
        loader:'url-loader'
      }
    ]
  },
  plugins: [
  ]
};

module.exports = config;