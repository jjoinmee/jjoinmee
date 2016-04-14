var express = require('express');
var Event = require('../helpers/event');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  ':events': {
    get: function(req, res) {
      Event.getJoint(req.body.userId)
    },

    post: function(req, res) {
      Event.join(req.body.eventID, req.body.userId)
        .then(function(data) {
          res.send(data);
        })
    }
  }
};
