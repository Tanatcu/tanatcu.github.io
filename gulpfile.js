var gulp = require('gulp'),
		connect = require('gulp-connect');

gulp.task('default', ['watch'], function () {
	connect.server({
		root: '.',
		port: 3000,
		host: 'localhost',
		fallback: 'index.html',
		livereload: true
	});
});

gulp.task('watch', function () {
	gulp.watch([
		'app/*/*/*.html',
		'app/*/*.html',
		'app/*.js',
		'app/*/*.js'
	], ['reload']);
});

gulp.task('reload', function () {
	gulp.src('./app/*.html')
			.pipe(connect.reload());
});
