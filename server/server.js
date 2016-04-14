var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
var bodyParser = require('body-parser');
// var config = require('./database');
var eventRoute = require('./routes/eventRoute.js');
var userRoute = require('./routes/userRoute.js');
var db = require('./database').User;
var Event = require('./database').Event;
var Unjoin = require('./database').Unjoin;

// Require .env
require('dotenv').config();

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

apiRouter.route('/myevents/:event_id')
  .get(function(req, res) {
    console.log('inside server.js get ', req.params.event_id);
    Event.get(req.params.event_id)
    .then(function(data) {
      res.send('get successful', data);
    })
  })

  .delete(function(req, res) {
    console.log('inside server.js delete ');
    Event.delete(req.params.event_id)
    .then(function(deleted) {
      if (deleted) {
        console.log('deleted is true', deleted);
        res.send('delete successful');
      }
    })
  })

apiRouter.route('/joinevents')
  .get(function(req, res) {
    Event.getJoint(req.body.userId)
  })

  .post(function(req, res) {
    Event.join(req.body.eventID, req.body.userId)
    .then(function(data) {
      res.send(data);
    })
  })

  apiRouter.route('/filterevents')
  .post(function(req, res) {
    console.log(req);
    Event.getJoint(req.body.userId)
    .then(function(data) {
      res.send(data);
    })
  })

apiRouter.route('/unjoinevent/:event_id')
  .get(function(req, res) {
    console.log('req', req.params);
    console.log('req body', req.body);
    // console.log('inside server.js get ', req.params.event_id);
    Unjoin.get(req.params.event_id)
    .then(function(data) {
      res.send('get successful', data);
    })
  })

  .delete(function(req, res) {
    console.log('inside server.js delete ');
    console.log('req: ', req.query);
    Unjoin.delete(req.query.EventID, req.query.UserId)
    .then(function(deleted) {
      if (deleted) {
        console.log('deleted is true', deleted);
        res.send('delete successful');
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
