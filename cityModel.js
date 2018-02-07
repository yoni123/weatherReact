let mongoose = require('mongoose');


let commentSchema = new mongoose.Schema({
  userName: String,
  text: String
});

let citySchema = new mongoose.Schema({
  name: String,
  comments: [commentSchema]
});

let City = mongoose.model('city', citySchema);

module.exports = City;