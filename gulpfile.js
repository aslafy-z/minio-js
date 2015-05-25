/*
 * Minimal Object Storage Library, (C) 2015 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var gulp = require('gulp')
var babel = require('gulp-babel')
var mocha = require('gulp-mocha')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('default', ['test'], function() {
})

gulp.task('watch', function(cb) {
    "use strict";
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('minio.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/main'))
        .on('end', function() {
            cb()
        })
})

gulp.task('compile', function(cb) {
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('minio.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/main'))
        .on('end', function() {
            cb()
        })
})

gulp.task('test:compile', function(cb) {
    gulp.src('test/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('minio-test.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/test'))
        .on('end', function() {
            cb()
        })
})

gulp.task('test',['compile', 'test:compile'], function () {
    gulp.src('dist/test/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}))
})

