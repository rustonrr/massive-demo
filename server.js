var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require("lodash");

var db = massive.connectSync({
  connectionString: 'postgres://obtfrkyhepvhlk:287ad58ef357fbd951068f368c6ad7c8c27db6da634658749fee519504fa7342@ec2-54-235-72-121.compute-1.amazonaws.com:5432/d9n6vd7vc3cu9q?ssl=true'
})

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/', function(req, res) {
  // db.getAllInjuries(function(err, injuries) {
  //   res.send(injuries) 
  // });
  var cake = _.template(`
    <h1>hello <%=name %></h1>
  `)
  var html = cake({
    name: "Ruston"
  })
  res.send(cake({name: "Ruston"}))
});

app.get('/incidents', function(req, res) {
  var state = req.query.state;

  if(state) {
    db.getIncidentsByState([state], function(err, incidents){
      res.send(incidents);
    });
  }
  else {
      db.getAllIncidents(function(err, incidents){
    res.send(incidents);
      });
  }
});

app.post('/incidents', function(req, res) {
  var incident = req.body;
  db.createIncident([incident.state, incident.injuryId, incident.causeId], function(err, result){
    res.send(result[0]);
  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
