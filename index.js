'use strict';

var config = require('./config.js');


exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  context.succeed();
};

