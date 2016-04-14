var knex = require('../database').knex;
var Unjoin = {};

Unjoin.get = function(id) {
  return new Promise(function(resolve) {
    if (resolve) {
      knex('users_events').where('EventID', id).then(function(data) {
        resolve(data);
      })
    }
  })
};

Unjoin.delete = function(eventid, userid) {
  return new Promise(function(resolve) {
    if (resolve) {
      knex('users_events').where({'EventID': eventid, 'UserId': userid}).del()
        .then(function() {
          resolve(true);
        })
    }
  })
};

module.exports = Unjoin;
