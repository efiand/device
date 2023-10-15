import bemValidator from 'gulp-html-bem-validator';
import browsersync from 'browser-sync';
import clean from 'gulp-clean';
import del from 'del';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import postcss from 'gulp-postcss';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';
import stackSprite from 'gulp-svg-sprite';
import svgo from 'imagemin-svgo';
import svgoConfig from './svgo.config.js';
import vinylNamed from 'vinyl-named';
import webp from 'gulp-webp';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';

const { src, dest, watch, series, parallel } = gulp;
const server = browsersync.create();
const IS_DEV = process.env.NODE_ENV === 'development';

const Path = {
	Build: {
		CSS: ['source/styles/*.css'],
		JS: ['source/scripts/*.js']
	},
	DIST: 'public',
	Watch: {
		CSS: 'source/**/*.css',
		HTML: 'source/**/*.njk',
		ICONS: 'place/icons/**/*.{svg,png}',
		IMG: 'place/images/**/*.{svg,png,jpg}',
		IMG_DEST: 'public/images/**/*.{png,jpg}',
		JS: ['*.{js,cjs}', 'source/**/*.{js,cjs}'],
		SPRITE: 'source/icons/*.svg'
	}
};
if (!IS_DEV) {
	Path.Build.JS.push('!source/scripts/dev.js');
}

const buildHTML = () => src('source/layouts/pages/**/*.njk')
	.pipe(posthtml())
	.pipe(bemValidator())
	.pipe(rename({ extname: '.html' }))
	.pipe(dest(Path.DIST));

const buildCSS = () => src(Path.Build.CSS)
	.pipe(postcss())
	.pipe(rename({ suffix: '.min' }))
	.pipe(dest(`${Path.DIST}/styles`));

const buildJS = () => src(Path.Build.JS)
	.pipe(vinylNamed())
	.pipe(webpackStream(webpackConfig, webpack))
	.pipe(dest(`${Path.DIST}/scripts`));

const saveImages = () => src(Path.Watch.IMG)
	.pipe(imagemin([
		svgo(svgoConfig),
		mozjpeg({
			progressive: true,
			quality: 75
		}),
		pngquant()
	]))
	.pipe(clean())
	.pipe(dest(`${Path.DIST}/images`));

const createWebp = () => src(Path.Watch.IMG_DEST)
	.pipe(webp({ quality: 80 }))
	.pipe(dest(`${Path.DIST}/images`));

const optimizeIcons = () => src(Path.Watch.ICONS)
	.pipe(imagemin([
		svgo(svgoConfig),
		pngquant()
	]))
	.pipe(clean())
	.pipe(dest('source/icons'));

const buildSprite = () => src(Path.Watch.SPRITE)
	.pipe(stackSprite({ mode: { stack: true } }))
	.pipe(rename('sprite.min.svg'))
	.pipe(dest(`${Path.DIST}/images`));

const reload = (done) => {
	server.reload();
	done();
};

const startServer = () => {
	server.init({
		cors: true,
		open: false,
		server: Path.DIST,
		ui: false
	});

	watch([Path.Watch.HTML, 'source/layouts/**/*.js'], series(buildHTML, reload));
	watch('source/{components,scripts,lib}/**/*.{js,cjs}', series(buildJS, reload));
	watch(Path.Watch.CSS, series(buildCSS, reload));
	watch(Path.Watch.IMG, saveImages);
	watch(Path.Watch.IMG_DEST, series(createWebp, reload));
	watch(Path.Watch.ICONS, series(optimizeIcons, buildCSS, reload));
	watch(Path.Watch.SPRITE, series(buildSprite, reload));
};

const cleanDest = () => del([
	`${Path.DIST}/**/*.{html,css,js,webp}`,
	`${Path.DIST}/images/sprite.min.svg`
]);

const prepare = parallel(cleanDest, saveImages, optimizeIcons);
const compile = parallel(buildHTML, buildCSS, buildJS, createWebp, buildSprite);
export const build = series(prepare, compile);
export default series(build, startServer);
