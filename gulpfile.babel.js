import path from 'path';
import pkg from './package.json';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import buildConfig from './webpack.build';
import docsConfig from './webpack.docs';

const prod = process.env.NODE_ENV === 'production';
const $ = loadPlugins();
const paths = {
  src: {
    docs: {
      js: 'docs/app.js',
      i: 'docs/assets/i/*',
      less: 'docs/docs.less'
    },
    build: 'src/AMUIReact.js'
  },
  dist: {
    docs: prod ? './www/react' : './www',
    build: './dist',
    lib: './lib'
  }
};

const buildDate = $.util.date(Date.now(), 'isoDateTime');
const banner = [
  '/*! <%= pkg.title %> v<%= pkg.version %>',
  'by Amaze UI Team',
  '(c) ' + $.util.date(Date.now(), 'UTC:yyyy') + ' AllMobilize, Inc.',
  'Licensed under <%= pkg.license %>',
  buildDate + ' */\n'
].join(' | ');

gulp.task('build:pack', () => {
  return gulp.src(paths.src.build)
    .pipe(webpackStream(buildConfig))
    .pipe($.replace('__VERSION__', pkg.version))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest(paths.dist.build))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest(paths.dist.build))
    .pipe($.size({showFiles: true, title: 'minified'}))
    .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}));
});

gulp.task('build:docs', () => {
  return gulp.src('docs/app.js')
    .pipe(webpackStream(docsConfig))
    .pipe($.replace('__VERSION__', pkg.version, {skipBinary: true}))
    .pipe(gulp.dest(paths.dist.docs))
    .pipe($.size({
      showFiles: true,
      title: 'Docs bundle'
    }))
    .pipe($.size({
      showFiles: true,
      gzip: true,
      title: 'Docs bundle gzipped'
    }));
});

gulp.task('build:jsx', () => {
  return gulp.src(['src/**/*.js', '!src/__tests__/*.js'])
    .pipe($.if((file) => {
      return file.path.indexOf('DreamUIReact.js') > -1;
    }, $.replace('__VERSION__', pkg.version)))
    .pipe($.babel())
    .pipe(gulp.dest(paths.dist.lib));
});

gulp.task('clean', () => {
  return del([
    paths.dist.lib,
    paths.dist.build,
    paths.dist.docs,
  ]);
});

gulp.task('build', (cb) => {
  runSequence(
    'clean',
    ['build:pack', 'build:docs', 'build:jsx'],
    cb);
});

// upload docs assets to Qiniu
gulp.task('publish:cdn', () => {
  gulp.src(['www/**/*', '!www/**/*.html'])
    .pipe($.qndn.upload({
      prefix: 'assets/react',
      qn: {
        accessKey: process.env.qnAK,
        secretKey: process.env.qnSK,
        bucket: process.env.qnBucketUIS,
        domain: process.env.qnDomainUIS
      }
    }));
});

gulp.task('publish:npm', (done) => {
  require('child_process')
    .spawn('npm', ['publish'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('publish:tag', (done) => {
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  $.git.tag(v, message, (err) => {
    if (err) {
      throw err;
    }

    $.git.push('origin', 'master', (error) => {
      if (error) {
        throw error;
      }
      done();
    });
  });
});

// TODO: complete publish tasks.
gulp.task('publish', (cb) => {
  runSequence(
    'build',
    [
      // to be
    ],cb
  );
});

gulp.task('dev', () => {
  const bundler = webpack(docsConfig);
  const bs = browserSync.create();

  bs.init({
    logPrefix: 'AMR',
    server: {
      baseDir: ['www', 'node_modules/amazeui/dist'],
      middleware: [
        // @see https://github.com/BrowserSync/browser-sync/issues/204
        /*function(req, res, next) {
          var match = req.url.match(/\/[css|fonts|i].+\..+|\/app\.js|\/app\.min\.js/g);
          req.url = match ? match[0] : '/index.html';

          return next();
        },*/
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: docsConfig.output.publicPath,

          // pretty colored output
          stats: {colors: true}

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    },
  });
});

gulp.task('default', ['dev']);
