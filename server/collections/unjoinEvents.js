var express = require('express');
var Unjoin = require('../helpers/unjoin');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  ':event_id': {
    get: function(req, res) {
      Unjoin.get(req.params.event_id)
        .then(function(data) {
          res.send('get successful', data);
        });
    },

    delete: function(req, res) {
      Unjoin.delete(req.query.EventID, req.query.UserId)
        .then(function(deleted) {
          if (deleted) {
            res.send('delete successful');
          }
        })
    }
  }
};
