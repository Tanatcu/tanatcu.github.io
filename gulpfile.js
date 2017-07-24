var gulp = require('gulp'),
		connect = require('gulp-connect');

var useref = require('gulp-useref'),
		uglify = require('gulp-uglify'),
		cssmin = require('gulp-cssmin'),
		gulpif = require('gulp-if');

gulp.task('dev', function () {
	connect.server({
		root: 'src',
		port: 3000,
		host: 'localhost',
		fallback: 'src/index.html',
		livereload: true
	});
});

gulp.task('prod', function () {
	connect.server({
		root: '.',
		port: 3000,
		host: 'localhost',
		fallback: 'index.html',
		livereload: true
	});
});

gulp.task('build', ['html', 'fonts'], function () {
	return gulp.src('index.html')
			.pipe(useref())
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', cssmin()))
			.pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
	return gulp.src(['src/views/*.html', 'src/components/**/*.html'])
			.pipe(gulp.dest('./views'));
});

gulp.task('fonts', function () {
	return gulp.src('src/assets/fonts/*/*.*')
			.pipe(gulp.dest('./fonts'));
});
