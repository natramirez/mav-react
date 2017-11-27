//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Questions = require('../model/questions');
var connectFailed = false;
//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.PORT || 8080;

// connect to mongodb using mongodb URI
var dbconfig = {
    user:'mav-dev',
    psw:'mavpsw123',
    host:'ds151973',
    port:'51973',
    name:'mav-example'
}
var mongoURI = 'mongodb://'+dbconfig.user+':'+dbconfig.psw+'@'+dbconfig.host+'.mlab.com:'+dbconfig.port+'/'+dbconfig.name;
mongoose.connect(mongoURI, { useMongoClient: true });

var db = mongoose.connection;
db.on('error', function(err) {
  console.error('MongoDB connection error:', err);
  connectFailed = true;
});

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove caching so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /questions route to our /api router
router.route('/questions')
  //retrieve all questions from the database
  .get(function(req, res) {
    if (connectFailed) res.send({'name':'MongoError'});
    if (req.query && req.query.numQuestions) {
      var numQuestions = JSON.parse(req.query.numQuestions);      
    }
    //looks at our Question Schema
    Questions.aggregate({'$sample': { 'size': numQuestions }}, function(err, questions) {
      if (err) {
        console.log('err: ' + err);
        res.send(err);
      }
      //responds with a json object of our database questions.
      res.json(questions);
    });
  });

//Use our router configuration when we call /api
app.use('/api', router);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});