var gulp = require('gulp'),
		connect = require('gulp-connect'),
		deploy = require('gulp-gh-pages');

var useref = require('gulp-useref'),
		uglify = require('gulp-uglify'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat-css'),
		wiredep = require('wiredep').stream,
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

gulp.task('testProd', function () {
	connect.server({
		root: '.',
		port: 3000,
		host: 'localhost',
		fallback: 'index.html',
		livereload: true
	});
});

gulp.task('build', ['html', 'fonts'], function() {
	return gulp.src('src/index.html')
			.pipe(useref())
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', cssmin()))
			.pipe(gulp.dest('.'));
});

gulp.task('html', function() {
	return gulp.src(['src/app/views/*.html', 'src/app/components/**/*.html'])
			.pipe(gulp.dest('./views'));
});

gulp.task('fonts', function() {
	return gulp.src('src/app/assets/fonts/*/*.*')
			.pipe(gulp.dest('./fonts'));
});
