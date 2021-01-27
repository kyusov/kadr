const { src, dest, parallel, series, watch } = require('gulp')

const notify = require('gulp-notify')
const autoprefixer = require('gulp-autoprefixer')

const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const cleanCss = require('gulp-clean-css')

const rename = require('gulp-rename')

const fileInclude = require('gulp-file-include')
const svgSprite = require('gulp-svg-sprite')

const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

const browserSync = require('browser-sync').create()
// const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const uglify = require('gulp-uglify-es').default

const del = require('del')

const tinypngCompress = require('gulp-tinypng-compress')

const clean = () => {
  return del(['app/*'])
}

const fonts = () => {
  src('./src/assets/fonts/**.ttf').pipe(ttf2woff()).pipe(dest('./app/fonts/'))
  return src('./src/assets/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'))
}

const svgSprites = () => {
  return src('./src/assets/img/**.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('./app/img'))
}

const styles = () => {
  return src('./src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src('./src/*.html')
    .pipe(
      fileInclude({
        prefix: '@',
        passpath: '@file',
      })
    )
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const imgToApp = () => {
  return src([
    './src/assets/img/**/**.jpg',
    './src/assets/img/**/**.png',
    './src/assets/img/**/**.jpeg',
    './src/assets/img/**/**.webp',
  ]).pipe(dest('./app/img'))
}

const scripts = () => {
  return src('./src/js/**/*.js')
    .pipe(
      webpackStream({
        mode: 'development',
        entry: {
          'main': './src/js/main.js',
          'calendar': './src/js/calendar.js',
          'event': './src/js/event.js',
          'burger': './src/js/burger.js',
          'career': './src/js/career.js',
          'links': './src/js/links.js'
        },
        output: {
          filename: '[name].js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err)
      this.emit('end') // Don't stop the rest of the task
    })
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
  })

  watch('./src/assets/scss/**/*.scss', styles)
  watch(['./src/components/**/*.html', './src/*.html'], htmlInclude)
  watch(
    [
      './src/assets/img/**/**.jpg',
      './src/assets/img/**/**.jpeg',
      './src/assets/img/**/**.png',
      './src/assets/img/**/**.webp',
    ],
    imgToApp
  )
  watch('./src/assets/img/**.svg', svgSprites)
  watch('./src/assets/fonts/**.ttf', fonts)
  watch('./src/js/**/*.js', scripts)
}

exports.styles = styles
exports.watchFiles = watchFiles

exports.default = series(
  clean,
  parallel(htmlInclude, scripts, fonts, imgToApp, svgSprites),
  styles,
  watchFiles
)

const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(
      tinypngCompress({
        key: 'w14ZH5gR2jn5nNbZGppBFHqqv5KK3rGx',
      })
    )
    .pipe(dest('./app/img'))
}

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err)
      this.emit('end') // Don't stop the rest of the task
    })
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('./app/js'))
}

const stylesBuild = () => {
  return src('./src/assets/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest('./app/css/'))
}

exports.build = series(
  clean,
  parallel(htmlInclude, scriptsBuild, fonts, imgToApp, svgSprites),
  stylesBuild,
  tinypng
)
