var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var open = require('open');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;
var rework = require('gulp-rework');
var suit = require('rework-suit');
var csso = require('gulp-csso');
var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');

var options = {
  'port': 8000,
  'host': 'localhost',
  'cssSrcPath': './src/css/src/',
  'cssDistPath': './src/css/dist/',
  'cssJekyllPath': './_site/css/dist'
};

gulp.task('server', function () {
  var serve = serveStatic('./_site');

  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)
    serve(req, res, done)
  });

  server.listen(options.port);
});

gulp.task('open', function() {
  open('http://' + options.host + ':' + options.port);
});

gulp.task('css', function () {
  gulp.src(options.cssSrcPath + 'main.css')
    .pipe(rework(suit()).on('error', gutil.log))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(options.cssDistPath))
    .pipe(gulp.dest(options.cssJekyllPath))
    .pipe(livereload());
});

gulp.task('jekyll', function () {
  spawn('jekyll', ['build'], {
    stdio: 'inherit'
  });

  gulp.src(['_site/**/*.html', '_site/**/*.md']);
})

gulp.task('watch', function() {
  gulp.watch(options.cssSrcPath + '**/*.css', ['css']);
  gulp.watch(['src/**/*.html', 'src/**/*.md'], ['jekyll']);
});

gulp.task('build', ['css']);
gulp.task('default', ['server', 'build', 'watch']);
gulp.task('start', ['open', 'default']);
