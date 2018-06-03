/*eslint-env node*/

let express = require('express');
let MongoClient = require('mongodb').MongoClient;

var path = require('path');
var bodyParser = require('body-parser');


// create a new express server
var app = express();

MongoClient.connect('mongodb://ezboard:3azyB0arD@cluster0-shard-00-00-onaim.mongodb.net:27017,cluster0-shard-00-01-onaim.mongodb.net:27017,cluster0-shard-00-02-onaim.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',(err,database) =>{

  if (err) return console.log(err)

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  app.use('/', express.static(path.join(__dirname,'../dist/')));

  require('./routes/routes')(app, database.db('ezboard'));

  app.listen(3000,() => {
      console.log('We are live on port 3000'); 
  });

});