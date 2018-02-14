const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const City = require('./cityModel');
const app = express();
const url = 'mongodb://localhost/weatherReactDB';
const request = require('request');

mongoose.connect(process.env.CONNECTION_STRING || url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/cities', function (req, res) {
  City.find(function (err, result) {
    if (!err) {
      res.send(result);
    }
  });
});

function addCity(cityName, response) {
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
  request(url, function (req, res, body) {
    const result = JSON.parse(body);
    if (result.cod == 200) {
      let city = new City({
        name: result.name,
        comments: []
      });
      city.save(function (err) {
        if (err) {
          response.status(500).send(err);
        }
        else {
          response.send({ cod: 200, city: city, isexist: false });
        }
      });
    } else {
      response.status(500).send('oops... somthing went wrong! \nDid you type currect city?');
    }
  });
}

app.post('/city', function (req, response) {
  let cityName = req.body.city.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  City.find({ name: cityName }, (err, res) => {
    if (res.length > 0) {
      response.send({ cod: 200, isexist: true });
    } else {
      addCity(cityName, response);
    }
  })
});

app.delete('/city/:id', function (req, res) {
  const id = req.params.id;
  City.findById(id, (err, city) => {
    city.remove((err) => {
      if (!err) {
        res.send(id);
      }
    })
  });
});

app.post('/comment/:id', (req, res) => {
  const id = req.params.id;
  City.findById(id, (err, city) => {
    if (!err) {
      city.comments.push(req.body);
      city.save((err) => {
        if (!err) {
          res.send({ comment: city.comments[city.comments.length - 1], _id: id });
        } else {

        }
      })
    }
  })
})


app.delete('/city/:cityId/comment/:commentId', (req, res) => {
  const { cityId, commentId } = req.params;
  City.findById(cityId, (err, city) => {
    city.comments.id(commentId).remove();
    city.save(function (err) {
      if (err) {
        res.sendStatus(500).send(err);
      }
      else {
        res.send({ cityId: cityId, commentId: commentId });
      }
    });
  });
})

app.listen(process.env.PORT || 3001);

app.use(function (err, request, response, next) {

  if (err) {
      response.sendStatus(500).send("server error please try again later");
  }
})
