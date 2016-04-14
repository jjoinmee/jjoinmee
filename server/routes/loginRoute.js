var controllers = require('../collections/login.js');
var router = require('express').Router();

for (var route in controllers) {

  router.route("/" + route)
    .post(controllers[route].post);
}

module.exports = router;
