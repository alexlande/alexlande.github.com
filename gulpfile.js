var gulp = require('gulp');
var spawn = require('child_process').spawn;
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var atImport = require("postcss-import")
var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');

var options = {
  'port': 8000,
  'host': 'localhost',
  'cssSrcPath': './css/src/',
  'cssDistPath': './_includes/'
};

gulp.task('server', function () {
  var serve = serveStatic('./_site');

  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)
    serve(req, res, done)
  });

  server.listen(options.port);
});

gulp.task('css', function () {
  gulp.src(options.cssSrcPath + 'main.css')
    .pipe(postcss([atImport, cssnext, cssnano]))
    .pipe(gulp.dest(options.cssDistPath));
});

gulp.task('jekyll', function () {
  spawn('bundle', ['exec', 'jekyll', 'build'], {
    stdio: 'inherit'
  });

  gulp.src(['_site/**/*.html', '_site/**/*.md']);
})

gulp.task('watch', function() {
  gulp.watch(options.cssSrcPath + '**/*.css', ['css']);
  gulp.watch([
    './_includes/main.css',
    './**/*.html',
    './**/*.md',
    '!./_site/**/*',
    '!./node_modules/**/*'
  ], ['jekyll']);
});

gulp.task('build', ['css', 'jekyll']);
gulp.task('default', ['server', 'build', 'watch']);
