module.exports = function (app, topDB) {

	app.get('/api/blockers/get', function (req, res) {

    topDB.collection('blockers').find({}).toArray(function(err, docs){
      res.send(docs);
    })
  });
  
  app.post('/api/blockers/new', function (req, res) {
    topDB.collection('blockers').insertOne(req.body, function(err, result){
      if(err) {
        res.send('There was a problem inserting the doc')
      } else {
        res.send('Doc successfully inserted');
      }
    })
	});
};
