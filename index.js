'use strict';

var aws = {
  //accessKeyId : "",
  //secretAccessKey: "",
  region: 'us-east-1',
  maxRetries: 2,
  sslEnabled: true,
  convertResponseTypes: true
};

var Parser = require('@jasonfill/lambda-cloud-watch-log-parser')({ aws: aws });

var opts = {
  log_group_name: '/var/log/mail.log',
  log_stream_name: 'i-2f8658f8',
  invoke_id: '5434c6a5-dc40-11e4-9497-9f7835f8ec01'
};

var config = require('./config.js');

var AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  apiVersion: '2015-07-16'
});

var SNS = new AWS.SNS();

var cloudwatchlogs = new AWS.CloudWatchLogs();

exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  var message = event.Records[0].Sns.Message;
  console.log('From SNS:', message);

  var filterParams = {
    logGroupName: config.logs.groupName,
    //endTime: 0,
    filterPattern: config.logs.filterPattern,
    interleaved: true,
    limit: 100,
    logStreamNames: config.logs.streamNames
    //startFromHead: false
    //nextToken: 'STRING_VALUE',
    //startTime: 0
  };

  console.dir(filterParams);

  cloudwatchlogs.filterLogEvents(filterParams, function(err, data) {
    console.log('got log data', arguments);
    console.dir(data);

    var params = {
      TopicArn: config.SNS.supportARN,
      Subject: 'OH NOES!',
      Message: 'Test 123\n Something went wrong'
    };

    SNS.publish(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('Sent', data);
        context.succeed(message);
      }
    });
  });

};

