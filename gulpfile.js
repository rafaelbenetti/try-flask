 /*jshint esversion: 6 */
 (function () {
     'use strict';

     const gulp = require('gulp');
     const minifyCss = require('gulp-clean-css');
     const uglify = require('gulp-uglify');
     const del = require('del');
     const rename = require('gulp-rename');
     const jshint = require('gulp-jshint');
     const plumber = require('gulp-plumber');
     const stylish = require('jshint-stylish')
     const concat = require('gulp-concat');
     const sass = require('gulp-sass');
     const babel = require('gulp-babel');
     const chmod = require('gulp-chmod');
     const postcss = require('gulp-postcss');
     const autoprefixer = require('autoprefixer');

     const publicFolder = 'public/';
     const scriptsPath = [
         `${publicFolder}/js/commun/*.js`,
         `${publicFolder}/js/*.js`
     ];

     gulp.task('delete', () => {
         del([
             `${publicFolder}assets/css`,
             `${publicFolder}assets/js`
         ], (err) => {
             console.log('Files deleted');
         });
     });

     gulp.task('style', () => {
         return gulp
             .src(`${publicFolder}scss/*.scss`)
             .pipe(concat('style.css'))
             .pipe(sass().on('error', sass.logError))
             .pipe(postcss([autoprefixer]))
             .pipe(minifyCss())
             .pipe(rename({
                 suffix: '.min'
             }))
             .pipe(gulp.dest(`${publicFolder}assets/css`));
     });

     gulp.task('script', () => {
         return gulp
             .src(scriptsPath)
             .pipe(plumber())
             .pipe(jshint({
                 esversion: 6
             }))
             .pipe(jshint.reporter(stylish))
             .pipe(babel({
                 presets: ['es2015']
             }))
             //.pipe(uglify())
             .pipe(concat('script.js'))
             .pipe(rename({
                 suffix: '.min'
             }))
             .pipe(gulp.dest(`${publicFolder}assets/js`));
     });

     gulp.task('watch', () => {
         gulp.watch(`${publicFolder}scss/*.scss`, ['style']);
         gulp.watch(scriptsPath, ['script']);
     });

     gulp.task('default', ['delete', 'style', 'script', 'watch']);
 })();