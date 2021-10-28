const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); //convert sass to css
const cssnano = require("gulp-cssnano"); //convert css code into one line
const rev = require("gulp-rev"); //rename the file with hash along them
const uglify = require("gulp-uglify-es").default; //convert js code into one line
const imagemin = require("gulp-imagemin"); //convert images code into one line
const del = require("del");

//gulp task which runs and perform the required actions
// src("./assets/sass/**/*.scss")  any folderand subfolder with anyfile whose extention is .scss
//  pipe fxn which call middlewares associated with gulp
// will alsocreate manifest which gives us key value .
gulp.task("css", function (done) {
  console.log("minifying css");
  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

//uglify to minify js
gulp.task("js", function (done) {
  console.log("minifying js");

  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("minifying images");

  gulp
    .src("./assets/**/*,+|png|jpg|gif|svg|jpeg")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

//empty the public assets directory ,when building the project need to build from scratch
gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");

  done();
});

// will run all four gulp tasks
gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("building assets");

    done();
  }
);
