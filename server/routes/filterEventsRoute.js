var controllers = require('../collections/filterEvents.js');
var router = require('express').Router();

for (var route in controllers) {

  router.route("/" + route)
    .post(controllers[route].post);
}

module.exports = router;
