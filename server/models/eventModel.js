var db = require('../database').db;

var Event = db.Model.extend({
  tableName: 'events',
  users: function () {
    this.belongsToMany(User, 'users_events', 'UserID');
  }
});

module.exports = Event;