#!/usr/bin/env node

require('./container')
    .build('app')
    .testAndCommit();