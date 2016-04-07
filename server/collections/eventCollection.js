var db = require('../database').db;
var Event = require('../models/eventModel.js');


var Events = new db.Collection();
Events.model = Event;

module.exports = Events;