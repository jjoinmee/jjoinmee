var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
var bodyParser = require('body-parser');
// var config = require('./database');
var eventRoute = require('./routes/eventRoute.js');
var userRoute = require('./routes/userRoute.js');
var db = require('./database').User;

app.use(express.static('./www'));

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require API router
var apiRouter = express.Router();
app.use('/api', apiRouter);

app.use('/api/events',eventRoute);
app.use('/api/users', userRoute);



// api routing for users
apiRouter.route('/login')
  .get(function(req, res) {

  })

  .post(function(req, res) {
    console.log(req.body.Email);
    db.findUser(req.body.Email).then(function(data) {
      console.log(data);
      if (data.length > 0) {
        console.log('something here', data);
        res.redirect('/#/app/myevents');
      } else {
        console.log('saving new user');
        db.addUser(req.body.Email).then(function(input) {
          console.log('should be true:', input);
        res.send('user added');
        })
      }
    })

  })

// app.post('/api/login', function(req, res) {
//   var query = db('users').select('*').where({email: req.body.email});
//   console.log('entering post', query);

//   if (query.length > 0) {
//     console.log('something here', query);
//     res.redirect('/#/app/myevents');
//   } else {
//     console.log('saving new user', query);
//     db('users').insert({ email: req.body.email });
//   }
// })


app.listen(port, function(){
  console.log('Listening on port ' + port + '...');
});
