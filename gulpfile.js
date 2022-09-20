"use strict";

const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const { parallel, series } = require("gulp");
const connect = require("gulp-connect");

function hostHtml() {
  connect.server({
    root: "./dist",
    livereload: true,
    port: 3000,
  });
}

function buildHtml() {
  return gulp
    .src("./src/index.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload());
}

function buildStyles() {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload());
}

function watch() {
  gulp.watch(
    "./src/",
    { ignoreInitial: false },
    parallel(buildStyles, buildHtml)
  );
}

exports.default = parallel(watch, hostHtml);
exports.build = series(buildHtml, buildStyles);
exports.start = hostHtml;
