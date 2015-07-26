'use strict';

var grunt = require('grunt');

var config = require('./config.js');

grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
  lambda_invoke: {
    default: {
    }
  },
  lambda_deploy: {
    default: {
      arn: config.lambdaArn
    }
  },
  lambda_package: {
    default: {
    }
  }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);

