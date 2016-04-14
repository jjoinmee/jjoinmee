var knex = require('../database').knex;

var Event = {};

Event.get = function(id) {
  return new Promise(function(resolve) {
    if (resolve) {
      knex('events').where('id', id).then(function(data) {
        resolve(data);
      })
    }
  })
}

Event.delete = function(id) {
  console.log('inside delete ', id);
  return new Promise(function(resolve) {
    if (resolve) {
      console.log('inside resolve promise for delete');
      knex('users_events').where('EventID', id).del()
        .then(function() {
          console.log('inside first then events');
          knex('events').where('id', id).del()
            .then(function() {
              console.log('inside then function');
              resolve(true);
            })
        })
    }
  })
}

Event.join = function (eventID, userId) {
  return new Promise(function(resolve) {
    if (resolve) {
      knex('users_events').insert({ eventID: eventID, userId: userId})
        .then(function(data) {
          resolve(data);
        })
    }
  })
}

Event.getJoint = function (userId) {
  return new Promise(function(resolve) {
    if (resolve) {
      knex('users_events').select('EventID').where({userId: userId}).then(function(data) {
        resolve(data);
      })
    }
  })
}

module.exports = Event;
