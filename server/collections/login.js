var express = require('express');
var User = require('../helpers/users');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

module.exports = {
  'user': {
    post: function(req, res) {
      console.log(req.body.Email);
      User.findUser(req.body.Email).then(function(data) {
        console.log(data);
        if (data.length > 0) {
          console.log('something here', data);
          res.redirect('/#/app/myevents');
        } else {
          console.log('saving new user');
          User.addUser(req.body.Email).then(function(input) {
            console.log('should be true:', input);
            res.send('user added');
          })
        }
      })

    }
  }
}

