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
      //want to get one user
      console.log(req);
      knex('users').where('Username',req.query.Username).then(function(data){
        res.send(data);
      });
    },
    post: function (req,res) {
      knex('users').insert({
        FirstName: req.query.FirstName,
        LastName: req.query.LastName,
        Username: req.query.Username
      }).then(function(){
        res.send('User added.');
      });
    }
  }
};
