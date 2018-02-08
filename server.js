const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const City = require('./cityModel');
const app = express();
const url = 'mongodb://localhost/weatherReactDB';
const request = require('request');
const http = require("http");

mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/cities', function (req, res) {

  City.find(function (err, result) {
    // console.log("wow ", result)
    res.send(result);
  });

});

app.post('/city', function (req, response) {

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&units=metric&appid=30067fef6af3503bfe31562948f3958b";
  //     http.get(url, res => { 
  //       // console.log('resq ',res);
  //       // console.log('errq ', err);
  //       // console.log('bodyq ',body);
  //       let body;
  //       res.on('data', data => {
  //         body = data;
  //       });

  //       res.on('end', () =>{
  //         body = JSON.parse(body);
  // console.log(body);
  // if(body.cod == 200) {

  // }
  //       })
  request(url, function (req, res, body) {
    const result = JSON.parse(body);
    console.log(result);
    if (result.cod == 200) {
      let city = new City({
        name: result.name,
        comments: []
      });
      city.save(function (err) {
        if (err) {
          //  console.error('save err',err);
          response.status(500).send(err);
        }
        else {
          // console.log('city',city);
          response.send({ cod: 200, city: city });
        }
      });
    } else {
      console.log(result);
      //console.log('aa',JSON.parse(body));
      //response.send({status: 100, messege: body.messege}); //"oops... somthing went wrong! \nDid you type currect city?"})
      response.status(500).send();
    }
  });

});

app.delete('/city/:id', function (req, res) {
  console.log(req.params.id);
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
  console.log(req.params);
  const { cityId, commentId } = req.params;
  console.log('f', cityId, commentId);

  City.findById(cityId, (err, city) => {
    console.log(city);
    city.comments.id(commentId).remove();
    city.save(function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500).send(err);
      }
      else {
        res.send({ cityId: cityId, commentId: commentId });
      }
    });
  });
})

app.listen(3001);






