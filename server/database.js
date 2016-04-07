var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: 'mysqlcluster16.registeredsite.com',
    user: 'joinme',
    password: '!Qaz2wsx',
    database: 'joinme'
  },
  pool: {
    min: 0,
    max: 7
  }
});

var bookshelf = require('bookshelf')(knex);

knex.schema.createTableIfNotExists('users', function (user) {
  user.increments('id').primary();
  user.string('FirstName');
  user.string('LastName');
  user.string('Username');
}).then(function() {
  console.log('users table created');
});

knex.schema.createTableIfNotExists('events', function (event) {
  event.increments('id').primary();
  event.string('EventName');
  // event.integer('Owner_id').references('User_id');
  event.string('EventTime');
  event.string('EventDuration');
  event.string('EventDate');
  event.string('Location');
}).then(function() {
  console.log('events table created');
});

knex.schema.createTableIfNotExists('users_events', function(join) {
  join.integer('EventID').unsigned();
  join.integer('UserId').unsigned();
  join.foreign('EventID').references('id').inTable('events');
  join.foreign('UserId').references('id').inTable('users');

}).then(function() {
  console.log('users_events join table created');
});

var db = bookshelf;

module.exports = {
  db: db,
  knex: knex
};
