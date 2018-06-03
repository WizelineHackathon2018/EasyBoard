/*eslint-env node*/

let express = require('express');
let MongoClient = require('mongodb').MongoClient;

var path = require('path');
var bodyParser = require('body-parser');


// create a new express server
var app = express();

MongoClient.connect('mongodb://localhost:27017',(err,database) =>{

  if (err) return console.log(err)

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  app.use('/', express.static(path.join(__dirname,'../dist/')));

  require('./routes/routes')(app, database.db('ezboard'));

  app.listen(3000,() => {
      console.log('We are live on port 3000'); 
  });

});