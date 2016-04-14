var express = require('express');
var knex = require('../database').knex;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  users: {
    get: function (req, res) {
      knex('users').where('Username', req.query.Username).then(function (data) {
        res.send(data);
      });
    },
    post: function (req, res) {
      knex('users').where({Email: req.body.Email}).select('id')
        .then(function (data) {
          res.send(data);
        })
    }
  }
};
