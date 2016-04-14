var knex = require('../database').knex;
var User = {};

User.findUser = function (email) {
  return new Promise (function (resolve) {
    if (resolve) {
      resolve(knex('users').select('*').where({Email: email}));
    }
  })
};

User.addUser = function (email) {
  return new Promise (function(resolve) {
    if (resolve) {
      knex('users').insert({ Email: email }).then(function() {
        resolve(true);
      });
    }
  });
};

module.exports = User;
