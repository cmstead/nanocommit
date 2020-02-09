#!/usr/bin/env node

process.on('uncaughtException', function () {
    console.log('An error occurred. Continuing anyway.')
});

require('./container')
    .build('app')
    .startApp();