'use strict';

var config = require('./config.js');

var TripCase = require('tripcase');
var tripcase = new TripCase(config.tripcase);

var slack = require('slack-notify')(config.slackWebhookUrl);


exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  tripcase.login(function (err, res, body) {
    console.log('login', body);

    tripcase.getTrips(function (err, res, trips) {
      console.log('getTrips', trips);

      /*
      slack.send({
        channel: config.channel,
        text: ' leaving for The Pirate Bay in 3 days and will return in 1 day'
      });
      */
    })
  });

  context.succeed();
};

