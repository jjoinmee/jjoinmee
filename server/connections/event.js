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
        knex('events').where({'userId': data[0].id}).select('EventName').then(function(data){
          res.send(data);
        });
      });
    },
    post: function (req,res) {
      knex('events').insert({
        inputTitle: req.query.inputTitle,
        userId: knex('users').where({Email: req.query.Email}).select('id'),
        datetimeValue: req.query.datetimeValue,
        duration: req.query.duration,
        address: req.query.address
      }).then(function(){
        res.send('Event added.');
      });
    }
  }
};
