var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3001);
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


app.get('/', function(req, res) {
  console.log(req.body); //the data on a new book
 res.send("cool");
}); 