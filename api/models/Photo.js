const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,

});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
