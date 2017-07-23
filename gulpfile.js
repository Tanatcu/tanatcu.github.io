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


gulp.task('default', ['watch'], function () {
	connect.server({
		root: './dist',
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

gulp.task('deploy', ['build'], function () {
	return gulp.src("./dist/**/*")
			.pipe(deploy())
});

gulp.task('build', ['html', 'fonts'], function() {
	return gulp.src('index.html')
			.pipe(useref())
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', cssmin()))
			.pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
	return gulp.src(['app/views/*.html', 'app/components/**/*.html'])
			.pipe(gulp.dest('dist/views'));
});

gulp.task('fonts', function() {
	return gulp.src('app/assets/fonts/*/*.*')
			.pipe(gulp.dest('dist/fonts/Centrale Sans'));
});
