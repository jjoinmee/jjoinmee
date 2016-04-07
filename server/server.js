var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
// var config = require('./database');
var userRoute = require('./routes/userRoute.js');

app.use(express.static('./client'));


app.use('/', userRoute);

app.listen(port, function(){
  console.log('Listening on port ' + port + '...');
});