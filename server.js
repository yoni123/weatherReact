const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const City = require('./cityModel');
const app = express();
const url = 'mongodb://localhost/weatherReactDB';

mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
 });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//app.use('/', index);

//root
// app.get('/', function(req, res) {
//  res.send("cool");
// }); 

app.get('/cities', function(req, res) {
  res.send('all cities');
});

app.post('/city', function(req, res) {
  
});

app.post('/comment:/cityId', function(req, res) {

});



app.listen(3001); 






