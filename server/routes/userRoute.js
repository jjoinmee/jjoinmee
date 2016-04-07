var controllers = require('../connections/user.js');
var router = require('express').Router();

for (var route in controllers) {

  router.route("/" + route)
    .get(controllers[route].get);
}

module.exports = router;