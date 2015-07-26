'use strict';

var grunt = require('grunt');

var config = require('./config.js');

grunt.loadNpmTasks('grunt-aws-lambda');

// These AWS Lambda options are loaded from npm config
// You can set this with `npm config set` or by editing .npmrc
var lambdaOptions = {
  region: process.env.npm_config_aws_default_region,
  profile: process.env.npm_config_aws_default_profile,
};

grunt.initConfig({
  lambda_invoke: {
    default: {
      options: lambdaOptions
    }
  },
  lambda_package: {
    default: {
      options: lambdaOptions
    }
  },
  lambda_deploy: {
    default: {
      arn: config.lambdaArn,
      options: lambdaOptions
    }
  }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);

