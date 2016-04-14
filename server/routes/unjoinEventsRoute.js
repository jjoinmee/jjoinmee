var controllers = require('../collections/unjoinEvents.js');
var router = require('express').Router();

for (var route in controllers) {

  router.route("/" + route)
    .get(controllers[route].get).delete(controllers[route].delete);
}

module.exports = router;
