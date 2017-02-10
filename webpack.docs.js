import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import marked from 'marked';
import hl from 'highlight.js';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const codeRenderer = function(code, lang) {
  lang = lang === 'js' ? 'javascript' : lang;
  if (lang === 'html') {
    lang = 'xml';
  }

  let hlCode = lang ?
    hl.highlight(lang, code).value : hl.highlightAuto(code).value;

  return `<div class="doc-highlight"><pre>
<code class="${lang || ''}">${hlCode}</code></pre></div>`;
};

let renderer = new marked.Renderer();
renderer.code = codeRenderer;

const entry = './docs/app.js';
const devEntry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client?reload=true',
  entry,
];
const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new HTMLWebpackPlugin({
    title: 'Amaze UI React',
    template: 'docs/index.html',
    inject: false,
    UICDN: isProduction ? 'http://cdn.amazeui.org/amazeui/2.7.1/' : '',
    assets: isProduction ? 'http://s.amazeui.org/assets/react' : '',
    stat: isProduction,
    minify: isProduction ? {
      removeComments: true,
      collapseWhitespace: true
    } : null,
  }),
];
const envPlugins = isProduction ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin(`Last update: ${new Date().toString()}`),
] : [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

export default {
  debug: !isProduction,
  devtool: !isProduction ? '#eval' : null,

  entry: isProduction ? entry : devEntry,

  output: {
    path: path.join(__dirname, isProduction ? 'www/react' : 'www'),
    filename: `app.[hash:7]${isProduction ? '.min' : ''}.js`,
    chunkFilename: '[id].chunk.js',
    publicPath: isProduction ? '/react/' : '/'
  },

  module: {
    // noParse: /babel-core/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'transform/cacheable?brfs',
          'babel'
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          'style',
          'css?minimize',
          'postcss',
          'less'
        ],
        include: [
          path.join(__dirname, 'docs')
        ]
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loader: 'file?name=[path][name].[ext]&context=docs/assets'
      },
    ]
  },

  plugins: basePlugins.concat(envPlugins),

  // watch: !isProduction,
  node: {
    fs: 'empty'
  },

  markdownLoader: {
    renderer: renderer
  },

  postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
};
