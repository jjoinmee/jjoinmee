var db = require('../database').db;

var User = db.Model.extend({
  tableName: 'users',
  events: function () {
    this.belongsToMany(Event, 'users_events', 'EventID');
  }
});

module.exports = User;