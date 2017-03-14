var path = require('path');
var webpack=require('webpack');
var project = require('./package.json');
var node_modules = path.resolve(__dirname, 'node_modules');
var react = path.resolve(node_modules, 'react/dict/react.js');
var autoprefixer = require("autoprefixer");
var process = require('process');

var ENV = process.env.NODE_ENV;
var config = {
  entry:{
    'example':'./example/example.jsx'
  },
  output:{
    //publicPath:"./dist/",
    publicPath:ENV == 'development' ? "http://localhost:8008/example/dist/" : "./dist/",
    path:"./example/dist/",
    filename:'example.js',
    chunkFilename:'chunk/[name].[chunkhash:8].js'
  },
  externals: [
    {
      "jquery": "jQuery",
      "react": "React",
      "react-dom": "ReactDOM",
      "zepto": "Zepto"
    },
    require('webpack-require-http')
  ],
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
        test: /\.md$/,
        loader: "html-loader!markdown-loader"
      },
      {
        test:/\.(jpg|png|gif|jpeg)?$/,
        loader:'url-loader'
      }
    ],
    noParse:/react/
  },
  resolve:{
    alias:{
      "dreamui-react":ENV == 'development' ? "../src/DreamUIReact.js" : '../lib/DreamUIReact.js'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer({browsers: ['> 0.1%']})],
      }
    })
  ]
};

module.exports = config;