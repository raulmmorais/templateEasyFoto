const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css'])

gulp.task('deps.js', ()=>{
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
    ])
        .pipe(uglify())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('public/assets/js'))
})
gulp.task('deps.css', ()=>{
    return gulp.src([
        'node_modules/angular-toastr/dist/angular-toastr.min.css',
    ])
        .pipe(uglifycss({"ugglyComments": true}))
        .pipe(concat('deps.min.css'))
        .pipe(gulp.dest('public/assets/css'))
})
