let gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  del = require("del");
	replace = require('gulp-replace');

gulp.task("scss", function() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        Browserslist: ["last 10 versions"]
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function() {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("style", function() {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/animate.css/animate.min.css",
    ])
    .pipe(concat("libs.min.css"))
    .pipe(
      cleanCSS({
        debug: true,
        compatibility: "ie8",
        level: {
          1: {
            specialComments: 0
          }
        }
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", function() {
  return gulp
    .src(["node_modules/mixitup/dist/mixitup.js", "node_modules/wow.js/dist/wow.min.js"])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

gulp.task("js", function() {
  return gulp.src("app/js/**/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("export", function() {
  let buildHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  let buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));
  let buildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));
  let buildImg = gulp.src("app/images/**/*.*").pipe(gulp.dest("dist/images"));
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task("clean", async function() {
  del.sync("dist");
});

gulp.task("watch", function() {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("js"));
});

gulp.task("build", gulp.series("clean", "export"));

gulp.task(
  "default",
  gulp.parallel("html", "scss", "js", "browser-sync", "watch")
);
