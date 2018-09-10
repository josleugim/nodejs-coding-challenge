'use strict';

const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    }),
    exec = require('child_process').exec;

gulp.task('default', ['start-mongo', 'serve']);

gulp.task('serve', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 4000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('restarting node server...');
        })
        .on('start', function () {
            console.log('Nodemon started');
        })
});

gulp.task('start-mongo', startService('mongod'));

function startService(command) {
    return function (callback) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            callback(err);
        });
    }
}