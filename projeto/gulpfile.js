const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulptask/app')
require('./gulptask/deps')
require('./gulptask/server')

gulp.task('default', ()=>{
    if (util.env.production){
        sequence('deps', 'app')
    }else{
        sequence('deps', 'app', 'server')
    }
})