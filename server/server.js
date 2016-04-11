var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
// var config = require('./database');
var eventRoute = require('./routes/eventRoute.js');
var userRoute = require('./routes/userRoute.js');

app.use(express.static('./www'));

app.use('/api/events',eventRoute);
app.use('/api/users', userRoute);

app.listen(port, function(){
  console.log('Listening on port ' + port + '...');
});
