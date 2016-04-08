var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var knex = require('../database').knex;
var Users = require('../collections/userCollection');
var Event = require('../models/eventModel');
var Events = require('../collections/eventCollection');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

module.exports = {
  events: {
    get: function (req, res) {
      //want to get one user
      console.log(req);
      knex('users').where({Username: req.query.Username}).select('id').then(function(data) {
        knex('events').where({'userId': data}).select('EventName').then(function(data){
          res.send(data);
        });
      });
    },
    post: function (req,res) {
      knex('events').insert({
        EventName: req.query.EventName,
        userId: knex('users').where({Username: req.query.Username}).select('id'),
        EventTime: req.query.EventTime,
        EventDuration: req.query.EventDuration,
        EventDate: req.query.EventDate,
        Location: req.query.Location
      }).then(function(){
        res.send('Event added.');
      });
    }
  }
};