'use strict';

var debug = require('debug')('slack-tripcase');

var config = require('./config.js');

var moment = require('moment');

var TripCase = require('tripcase');
var tripcase = new TripCase(config.tripcase);

debug('webhook', config.slack.webhook);

var Slack = require('slack-node');
var slack = new Slack();
slack.setWebhook(config.slack.webhook);


exports.handler = function(event, context) {
  debug('Received event:', JSON.stringify(event, null, 2));

  tripcase.login(function (err, res, session) {
    debug('login', session);

    tripcase.getTrips(function (err, res, trips) {
      debug('getTrips', trips);

      var trip = trips[0];

      // TODO: Handle no trips
      debug('trip', trip);


      var now = moment();
      var start = moment(trip.start_time);
      var end = moment(trip.end_time);
      var startDelta = start.from(now);
      var endDelta = end.from(now);

      debug('dates', start, end, startDelta, endDelta);

      // TODO: Test this
      var travelPhrase = now < start.add(22, 'hours') ? ' is leaving for ' : ' arrived in ';


      var message = trip.traveler_name + travelPhrase + trip.destination +' '+ startDelta +' and will return '+ endDelta +' from now';


      // TODO: Notify in #general if an event is happening today

      debug('channel', config.slack.channel);
      debug('message', message);
      debug('icon_url', trip.closest_image_mobi_medium);

      slack.webhook(
        {
          channel: config.slack.channel,
          username: 'TripCase',
          attachments: [
            {
              text: message,
              thumb_url: trip.closest_image_mobi_medium
            }
          ]
        },
        function (err, response) {
          debug('slack', response);

          context.succeed();
        }
      );

    });
  });

};

