const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const include = require('gulp-include');
const rename = require('gulp-rename');

const server = (done) => {
	connect.server({
		port: 3001,
		root: 'build',
		livereload: true,
	});
	done();
};

const styles = () =>
	gulp
		.src([
			'./src/assets/styles/libs/*.+(sass|scss)',
			'./src/assets/styles/normalize.scss',
			'./src/assets/styles/fonts.sass',
			'./src/assets/styles/main.sass',
			'./src/pages/**/*.sass',
			'./src/components/**/*.sass',
		])
		.pipe(sass({ sourceMap: false }))
		.pipe(autoprefixer({ overrideBrowserslist: ['> 0.1%'] }))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./build/assets/css/'))
		.pipe(connect.reload());

const html = () =>
	gulp
		.src('./src/pages/**/*.pug')
		.pipe(pug())
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest('./build'))
		.pipe(connect.reload());

const js = () =>
	gulp
		.src('./src/assets/js/index.js')
		.pipe(include())
		// .pipe(uglify())
		.pipe(gulp.dest('./build/assets/js'))
		.pipe(connect.reload());

const tiny = () =>
	gulp
		.src('./src/assets/images/*')
		.pipe(gulp.dest('./build/assets/images'))
		.pipe(connect.reload());

const fonts = () =>
	gulp
		.src('./src/assets/fonts/*')
		.pipe(gulp.dest('./build/assets/fonts'))
		.pipe(connect.reload());

const favicon = () =>
	gulp
		.src('./src/assets/favicon/*')
		.pipe(gulp.dest('./build/assets/favicon'))
		.pipe(connect.reload());

const watch = (done) => {
	gulp.watch('./src/**/*.+(sass|scss)', styles);
	gulp.watch('./src/**/*.pug', html);
	gulp.watch('./src/images/*', tiny);
	gulp.watch('./src/**/*.js', js);
	done();
};

gulp.task(
	'default',
	gulp.parallel(server, html, styles, fonts, js, favicon, tiny, watch)
);
