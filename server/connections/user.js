

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
  users: {
    get: function (req, res) {
      knex.select().table('users').then(function(data) {
        res.send(data);
      })
    }
  }
};